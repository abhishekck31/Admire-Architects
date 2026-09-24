"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiPaperclip } from "react-icons/fi";

import type { ApplicationFieldOptions } from "@/lib/api";

import { applyToJob, type ApplyState } from "../actions";

const INITIAL: ApplyState = { status: "idle" };

// Matches the underline inputs already used on /contact.
const FIELD =
  "w-full bg-transparent border-b border-border py-3.5 outline-none focus:border-brand-blue transition-colors font-light text-base tracking-wide";

const LABEL =
  "mb-1 block text-[13px] uppercase tracking-[0.2em] text-muted-foreground";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={LABEL}>
        {label}
        {required && <span className="ml-1 text-brand-blue">*</span>}
      </span>
      {children}
      {hint && (
        <span className="mt-1.5 block text-[14px] font-light text-muted-foreground/80">
          {hint}
        </span>
      )}
    </label>
  );
}

function Section({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-brand-blue-light/25 pt-8">
      <legend className="sr-only">{title}</legend>
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-mono text-[14px] font-semibold tracking-[0.2em] text-brand-blue-light">
          {step}
        </span>
        <h3 className="text-lg md:text-xl font-serif font-light tracking-tight">
          {title}
        </h3>
      </div>
      {children}
    </fieldset>
  );
}

function CheckboxGrid({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => (
        <label
          key={option}
          className="flex cursor-pointer items-center gap-3 text-base font-light"
        >
          <input
            type="checkbox"
            name={name}
            value={option}
            className="h-4 w-4 shrink-0 accent-[#1E3A8A]"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function Select({
  name,
  options,
  placeholder,
}: {
  name: string;
  options: string[];
  placeholder: string;
}) {
  return (
    <select name={name} defaultValue="" className={`${FIELD} cursor-pointer`}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="self-start bg-brand-blue px-10 py-5 text-sm uppercase tracking-[0.2em] font-medium text-white transition-colors duration-500 hover:bg-brand-blue-light disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Submit Application"}
    </button>
  );
}

export default function ApplyForm({
  jobSlug,
  jobTitle,
  options,
}: {
  jobSlug: string;
  jobTitle: string;
  options: ApplicationFieldOptions;
}) {
  const [state, formAction] = useActionState(applyToJob, INITIAL);

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="border border-brand-blue-light/40 bg-[#f8fafc] px-8 py-14 text-center"
      >
        <FiCheckCircle aria-hidden className="mx-auto mb-5 text-4xl text-brand-blue" />
        <h3 className="mb-3 text-2xl font-serif font-light tracking-tight">
          Application received
        </h3>
        <p className="mx-auto max-w-md font-light leading-relaxed text-muted-foreground">
          {state.message} We review every application and will reach out if
          there is a fit.
        </p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-12">
      <input type="hidden" name="jobSlug" value={jobSlug} />
      <input type="hidden" name="jobTitle" value={jobTitle} />

      <Section step="01" title="About you">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Full name" required>
            <input type="text" name="name" required autoComplete="name" className={FIELD} />
          </Field>
          <Field label="Email" required>
            <input type="email" name="email" required autoComplete="email" className={FIELD} />
          </Field>
          <Field label="Phone">
            <input type="tel" name="phone" autoComplete="tel" className={FIELD} />
          </Field>
          <Field label="Current location" hint="City you are based in.">
            <input
              type="text"
              name="currentLocation"
              autoComplete="address-level2"
              className={FIELD}
            />
          </Field>
          <Field label="Open to relocating">
            <Select
              name="openToRelocation"
              options={options.relocation}
              placeholder="Select…"
            />
          </Field>
        </div>
      </Section>

      <Section step="02" title="Your experience">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Total experience">
            <Select
              name="yearsExperience"
              options={options.experience}
              placeholder="Select…"
            />
          </Field>
          <Field label="Notice period">
            <Select
              name="noticePeriod"
              options={options.noticePeriod}
              placeholder="Select…"
            />
          </Field>
          <Field label="Current / most recent employer">
            <input type="text" name="currentEmployer" className={FIELD} />
          </Field>
          <Field label="Current designation">
            <input type="text" name="currentDesignation" className={FIELD} />
          </Field>
          <Field label="Current CTC" hint="Optional. Annual, in lakhs.">
            <input type="text" name="currentCtc" className={FIELD} />
          </Field>
          <Field label="Expected CTC" hint="Optional. Annual, in lakhs.">
            <input type="text" name="expectedCtc" className={FIELD} />
          </Field>
        </div>
      </Section>

      <Section step="03" title="Qualifications">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Highest qualification">
            <Select
              name="highestQualification"
              options={options.qualification}
              placeholder="Select…"
            />
          </Field>
          <Field label="Institution">
            <input type="text" name="institution" className={FIELD} />
          </Field>
          <Field label="Year of graduation">
            <input
              type="number"
              name="graduationYear"
              min={1950}
              max={2100}
              placeholder="2019"
              className={FIELD}
            />
          </Field>
          <Field
            label="CoA registration no."
            hint="If you are registered with the Council of Architecture."
          >
            <input type="text" name="coaRegistration" className={FIELD} />
          </Field>
        </div>
      </Section>

      <Section step="04" title="Your work">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field
              label="Portfolio link"
              hint="Behance, Issuu, Google Drive or your own site."
            >
              <input
                type="url"
                name="portfolioUrl"
                placeholder="https://"
                className={FIELD}
              />
            </Field>
            <Field label="LinkedIn">
              <input
                type="url"
                name="linkedinUrl"
                placeholder="https://"
                className={FIELD}
              />
            </Field>
          </div>

          <div className="pt-2">
            <span className={LABEL}>Software you work in</span>
            <div className="mt-3">
              <CheckboxGrid name="software" options={options.software} />
            </div>
          </div>

          <div className="pt-2">
            <span className={LABEL}>Project types you have delivered</span>
            <div className="mt-3">
              <CheckboxGrid name="projectTypes" options={options.projectTypes} />
            </div>
          </div>
        </div>
      </Section>

      <Section step="05" title="CV and a note">
        <div className="flex flex-col gap-8">
          <div>
            <label
              htmlFor="resume"
              className="mb-3 flex items-center gap-2 text-[13px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              <FiPaperclip aria-hidden className="text-brand-blue-light" />
              Attach your CV — PDF or Word, up to 4MB
            </label>
            <input
              id="resume"
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="block w-full text-base font-light text-muted-foreground file:mr-4 file:cursor-pointer file:border file:border-brand-blue/30 file:bg-transparent file:px-6 file:py-3 file:text-[13px] file:uppercase file:tracking-[0.2em] file:text-brand-blue file:transition-colors hover:file:bg-brand-blue/10"
            />
            <p className="mt-2 text-[14px] font-light text-muted-foreground/80">
              Keep your portfolio as a link above — design portfolios are
              usually far too large to attach.
            </p>
          </div>

          <Field label="Why this role?" hint="Optional, but it helps.">
            <textarea name="message" rows={4} className={`${FIELD} resize-none`} />
          </Field>
        </div>
      </Section>

      {state.status === "error" && (
        <p role="alert" className="text-base font-light text-destructive">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
