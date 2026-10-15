"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { Mesh, MeshBasicMaterial, SRGBColorSpace, Texture, TextureLoader } from "three";
import type { RefObject } from "react";
import type { Project } from "@/lib/projects";

type Surface = { project: number; src: string; aspect: number; width: number; position: [number, number, number]; rotation: [number, number, number] };
export type SceneScroll = { progress: number; invalidate: (() => void) | null };

function Installation({ projects, selected, reduced, scroll, onInvalidate, onSelect, onReady, onLoading }: {
  projects: Project[]; selected: number | null; reduced: boolean;
  scroll: RefObject<SceneScroll>;
  onInvalidate: (callback: (() => void) | null) => void;
  onSelect: (index: number) => void; onReady: () => void; onLoading: () => void;
}) {
  const { size, camera, gl, invalidate } = useThree();
  const mobile = size.width < 760 || size.width / size.height < .95;
  const meshes = useRef<(Mesh | null)[]>([]);
  const materials = useRef<(MeshBasicMaterial | null)[]>([]);
  const [textures, setTextures] = useState<(Texture | null)[]>([]);
  const cameraState = useRef({ x: 0, y: 0, z: 16, px: 0, py: 0 });
  const selection = useRef({ index: selected ?? 0 });
  const surfaces = useMemo<Surface[]>(() => {
    const desktopLayouts: Record<string, Pick<Surface, "width" | "position" | "rotation">> = {
      lane: { width: 8.1, position: [-4, -2, -.3], rotation: [.06, -.34, -.12] },
      arcus: { width: 8, position: [-.65, -.25, .4], rotation: [.03, -.35, -.1] },
      "teen-fiesta": { width: 8.4, position: [1.8, 1.1, -.8], rotation: [.05, -.42, -.14] },
      rewatch: { width: 8, position: [4.6, 3.35, -2.3], rotation: [.04, -.4, -.12] },
    };
    // One data entry produces one plane in both layouts. Gallery images stay in the case study.
    return projects.map((project, index) => ({
      project: index,
      src: project.cover.textureSrc ?? project.cover.src,
      aspect: project.cover.aspect,
      ...(mobile ? {
        width: [4.6, 4.5, 4.8, 4.6][index],
        position: [[-.7, -2.55, 1.4], [.45, -.8, .2], [-.25, .95, -.9], [.65, 2.6, -2]][index] as [number, number, number],
        rotation: [.03, -.22, -.1] as [number, number, number],
      } : desktopLayouts[project.slug]),
    }));
  }, [mobile, projects]);
  const poses = useMemo(() => surfaces.map((surface) => ({
    x: surface.position[0], y: surface.position[1], z: surface.position[2], scale: 1, light: 1,
  })), [surfaces]);

  useEffect(() => {
    onInvalidate(invalidate);
    invalidate();
    return () => onInvalidate(null);
  }, [onInvalidate, invalidate]);

  useEffect(() => {
    let cancelled = false;
    onLoading();
    const bank: (Texture | null)[] = surfaces.map(() => null);
    let pending = surfaces.length;
    const loader = new TextureLoader();
    surfaces.forEach((surface, i) => {
      loader.load(surface.src, (texture) => {
        if (cancelled) { texture.dispose(); return; }
        texture.colorSpace = SRGBColorSpace;
        texture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
        bank[i] = texture;
        if (--pending === 0) { setTextures([...bank]); invalidate(); }
      }, undefined, () => {
        if (--pending === 0 && !cancelled) { setTextures([...bank]); invalidate(); }
      });
    });
    return () => { cancelled = true; bank.forEach((texture) => texture?.dispose()); };
  }, [surfaces, gl, invalidate, onLoading]);

  useEffect(() => {
    // Adding a texture after the placeholder requires a new material program.
    materials.current.forEach((material) => { if (material) material.needsUpdate = true; });
    invalidate();
    if (textures.length === surfaces.length && textures.every(Boolean)) onReady();
  }, [textures, surfaces.length, invalidate, onReady]);

  useEffect(() => {
    // One cancellable timeline owns all focus poses and the base camera.
    // Pointer offsets are independent values, combined only in the frame renderer.
    const timeline = gsap.timeline({ onUpdate: invalidate });
    timeline.to(selection.current, { index: selected ?? 0, duration: reduced ? 0 : .9, ease: "power3.inOut" }, 0);
    surfaces.forEach((surface, i) => {
      const focus = surface.project === selected;
      const primary = focus;
      timeline.to(poses[i], {
        x: primary && mobile ? 0 : surface.position[0] * (primary ? .28 : 1),
        y: surface.position[1] * (primary ? .45 : 1),
        z: primary ? 2.9 : surface.position[2],
        scale: primary ? mobile ? .86 : 1.02 : 1, light: selected === null || focus ? 1 : .76,
        duration: reduced ? 0 : .9, ease: "power3.inOut",
      }, 0);
    });
    const primary = selected === null ? null : surfaces.find((surface) => surface.project === selected);
    timeline.to(cameraState.current, {
      x: primary ? primary.position[0] * .11 : 0,
      y: primary ? primary.position[1] * .11 : 0,
      z: mobile ? 14 : size.width / size.height < 1.3 ? 19 : 16,
      duration: reduced ? 0 : .9, ease: "power3.inOut",
    }, 0);
    return () => { timeline.kill(); };
  }, [surfaces, selected, poses, reduced, mobile, size.width, size.height, invalidate]);

  useEffect(() => {
    const element = gl.domElement;
    const values = cameraState.current;
    const moveX = gsap.quickTo(values, "px", { duration: .8, ease: "power2.out", onUpdate: invalidate });
    const moveY = gsap.quickTo(values, "py", { duration: .8, ease: "power2.out", onUpdate: invalidate });
    const move = (event: PointerEvent) => {
      if (reduced || mobile || event.pointerType !== "mouse") return;
      const bounds = element.getBoundingClientRect();
      moveX(((event.clientX - bounds.left) / bounds.width - .5) * .45);
      moveY(-((event.clientY - bounds.top) / bounds.height - .5) * .3);
    };
    const leave = () => { moveX(0); moveY(0); };
    values.px = values.py = 0;
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    invalidate();
    return () => {
      moveX.tween.kill(); moveY.tween.kill();
      element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave);
      element.style.cursor = "";
    };
  }, [gl, reduced, mobile, invalidate]);

  useFrame(() => {
    const view = cameraState.current;
    const travel = mobile || reduced ? 0 : scroll.current.progress;
    const mix = (a: number, b: number) => a + (b - a) * travel;
    // Continuous weights also keep rapid selection changes stable mid-scroll.
    const weights = surfaces.map((_, i) => Math.max(0, 1 - Math.abs(i - selection.current.index)));
    // Fit both axes so dashboard screenshots also clear the fixed navigation.
    const halfFov = Math.tan(20 * Math.PI / 180);
    const framingDistance = surfaces.reduce((distance, surface, i) => distance + weights[i] * Math.max(
      surface.width / (2 * halfFov * (size.width / size.height) * .84),
      (surface.width / surface.aspect) / (2 * halfFov * .78),
    ), 0);
    camera.position.set(mix(view.x + view.px, 0), mix(view.y + view.py, 0), mix(view.z, 3 + framingDistance));
    camera.lookAt(mix(view.x * .55, 0), mix(view.y * .55, 0), 0);
    poses.forEach((pose, i) => {
      const mesh = meshes.current[i];
      const weight = weights[i];
      if (mesh) {
        mesh.position.set(mix(pose.x, surfaces[i].position[0] * 1.6 * (1 - weight)), mix(pose.y, surfaces[i].position[1] * 1.4 * (1 - weight)), mix(pose.z, -10 + 13 * weight));
        mesh.scale.setScalar(mix(pose.scale, 1));
        mesh.rotation.set(...surfaces[i].rotation.map((angle) => angle * (1 - travel * weight)) as [number, number, number]);
      }
      const light = mix(pose.light, .18 + .82 * weight);
      materials.current[i]?.color.setRGB(light, light, light);
    });
  });

  return surfaces.map((surface, i) => (
    <mesh key={surface.src} ref={(mesh) => { meshes.current[i] = mesh; }}
      position={surface.position} rotation={surface.rotation}
      onClick={(event) => { event.stopPropagation(); onSelect(surface.project); }}
      onPointerOver={(event) => { event.stopPropagation(); gl.domElement.style.cursor = "pointer"; }}
      onPointerOut={() => { gl.domElement.style.cursor = ""; }}>
      <planeGeometry args={[surface.width, surface.width / surface.aspect]} />
      <meshBasicMaterial ref={(material) => { materials.current[i] = material; }}
        map={textures[i] ?? null} color={textures[i] ? "white" : "#101012"} toneMapped={false} />
      <mesh position={[0, 0, -.012]} scale={[1.004, 1.006, 1]}>
        <planeGeometry args={[surface.width, surface.width / surface.aspect]} />
        <meshBasicMaterial color="#424247" toneMapped={false} />
      </mesh>
    </mesh>
  ));
}

export default function SpatialScene(props: {
  projects: Project[]; selected: number | null; reduced: boolean;
  scroll: RefObject<SceneScroll>;
  onInvalidate: (callback: (() => void) | null) => void;
  onSelect: (index: number) => void; onReady: () => void; onLoading: () => void;
}) {
  return <Canvas camera={{ position: [0, 0, 16], fov: 40, near: .1, far: 80 }}
    style={{ touchAction: "pan-y pinch-zoom" }}
    dpr={[1, 1.5]} frameloop="demand" gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
    <Installation {...props} />
  </Canvas>;
}


