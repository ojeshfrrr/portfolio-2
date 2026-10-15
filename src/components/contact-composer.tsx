"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

export function ContactComposer() {
  const [draftHref, setDraftHref] = useState("");

  function prepareDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const message = String(values.get("message") ?? "").trim();

    for (const field of ["name", "message"]) {
      const input = event.currentTarget.elements.namedItem(field);
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        input.setCustomValidity(input.value.trim() ? "" : "Please enter more than spaces.");
      }
    }
    if (!event.currentTarget.reportValidity()) return;

    const subject = `Project note from ${name}`;
    const body = `Hi Ojesh,\n\n${message}\n\n— ${name}\n${email}`;

    setDraftHref(
      `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  }

  return (
    <form
      className="contact-composer"
      data-scroll-reveal
      onChange={(event) => {
        setDraftHref("");
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
          event.target.setCustomValidity("");
        }
      }}
      onSubmit={prepareDraft}
    >
      <div className="contact-composer__head">
        <span>Project note / 01</span>
        <span>Private until you send it</span>
      </div>

      <label className="contact-composer__field">
        <span>Your name</span>
        <input autoComplete="name" maxLength={80} name="name" required />
      </label>

      <label className="contact-composer__field">
        <span>Email address</span>
        <input autoComplete="email" maxLength={160} name="email" required type="email" />
      </label>

      <label className="contact-composer__field contact-composer__field--message">
        <span>What are you thinking about?</span>
        <textarea maxLength={2000} name="message" required rows={4} />
      </label>

      <div className="contact-composer__submit-row">
        <p>This prepares a message in your email app. Nothing is sent by this site.</p>
        <button className="contact-composer__submit" type="submit">
          Prepare the note <span aria-hidden="true">↗</span>
        </button>
      </div>

      <p aria-live="polite" className="contact-composer__result" role="status">
        {draftHref ? (
          <>
            Your draft is ready. <a href={draftHref}>Open it in your email app ↗</a>
          </>
        ) : null}
      </p>
    </form>
  );
}
