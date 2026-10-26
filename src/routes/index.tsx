import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import hero from "@/assets/hero.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APT138 Studio Tattoos — Tattoo & Body Piercing, Bronx NY" },
      {
        name: "description",
        content:
          "Custom tattoos and body piercing at 452 E. 138th St, Bronx, New York. Explore the work, request a quote or walk in.",
      },
      { property: "og:title", content: "APT138 Studio Tattoos — Bronx, New York" },
      {
        property: "og:description",
        content: "Ink that speaks for itself. Custom tattoos and body piercing in the Bronx.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const IG_URL = "https://www.instagram.com/apt138studio/";
const IG_DM = "https://ig.me/m/apt138studio";
const ADDRESS = "452 E. 138th Street, Bronx, NY 10454";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const NAV = [
  { id: "studio", label: "Studio" },
  { id: "tattoos", label: "Tattoos" },
  { id: "artists", label: "Artists" },
  { id: "piercing", label: "Piercing" },
  { id: "faq", label: "FAQ" },
];

// DEMO images — replace with real, authorized studio photos.
type Work = { src: string; alt: string; style: string; w: number; h: number; span: string };
const WORKS: Work[] = [
  { src: hero, alt: "Large script lettering back piece (demo image)", style: "Lettering", w: 1280, h: 1600, span: "md:col-span-2 md:row-span-2" },
  { src: work1, alt: "Black and grey realism portrait on forearm (demo image)", style: "Black & Grey", w: 896, h: 1152, span: "md:row-span-2" },
  { src: work2, alt: "Color butterfly on shoulder (demo image)", style: "Color", w: 1024, h: 1024, span: "" },
  { src: work3, alt: "Illustrative anime piece in progress on calf (demo image)", style: "Anime & Illustrative", w: 1152, h: 896, span: "md:col-span-2" },
];
const STYLES = ["All", ...Array.from(new Set(WORKS.map((w) => w.style)))];

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Studio />
        <Gallery />
        <Artists />
        <Services />
        <Process />
        <Quote />
        <WalkIns />
        <Policies />
        <Community />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function SectionMark({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="font-display text-lg text-bronze">{n}</span>
      <span className="h-px w-12 bg-border" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="leading-none" aria-label="APT138 Studio Tattoos home">
          <span className="font-display text-3xl tracking-wider">APT138</span>
          <span className="eyebrow mt-0.5 block text-[0.55rem]">Studio Tattoos</span>
        </a>
        <nav className="hidden gap-10 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="eyebrow text-foreground/80 transition-colors hover:text-bronze">
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#quote" className="btn-line hidden !py-3 lg:inline-flex">Book a session</a>
        <button className="p-2 lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 flex flex-col bg-graphite px-6 transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-20 items-center justify-between">
          <span className="font-display text-3xl tracking-wider">APT138</span>
          <button className="p-2" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-10 flex flex-col" aria-label="Mobile">
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-5 border-b border-border py-5"
            >
              <span className="font-display text-sm text-bronze">0{i + 1}</span>
              <span className="headline text-5xl">{n.label}</span>
            </a>
          ))}
        </nav>
        <a href="#quote" onClick={() => setOpen(false)} className="btn-solid mt-auto mb-10">
          Book a session
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="grain relative flex min-h-[100svh] flex-col overflow-hidden">
      <img
        src={hero}
        alt="Large script lettering tattoo across a back, lit in warm light (demo image)"
        width={1280}
        height={1600}
        className="absolute inset-0 h-full w-full object-cover object-[70%_30%] md:left-auto md:w-[62%]"
      />
      <div className="hero-veil absolute inset-0" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-28 pt-32 md:justify-center">
        <p className="eyebrow mb-8 text-bronze">Bronx, New York</p>
        <h1 className="headline text-[17vw] md:text-[8.5rem]">
          Ink that
          <br />
          <em className="font-serif normal-case italic text-foreground/90">speaks</em> for
          <br />
          itself.
        </h1>
        <p className="mt-8 max-w-md text-base text-muted-foreground md:text-lg">
          Custom tattoos. Distinctive artistry. A space built for self-expression.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#tattoos" className="btn-solid">Explore our work <ArrowRight className="h-4 w-4" /></a>
          <a href="#quote" className="btn-line">Book a session</a>
        </div>
      </div>
      <div className="relative mx-auto flex w-full max-w-7xl items-end justify-between px-6 pb-8">
        <span className="eyebrow">Tattoo & Body Piercing</span>
        <div className="flex items-center gap-3">
          <span className="eyebrow hidden sm:inline">Scroll</span>
          <span className="block h-12 w-px overflow-hidden bg-border">
            <span className="animate-scroll-line block h-full w-full bg-bronze" />
          </span>
        </div>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section id="studio" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <SectionMark n="01" label="The Studio" />
      <div className="grid gap-14 md:grid-cols-12">
        <h2 className="headline text-5xl md:col-span-7 md:text-7xl">
          More than ink.
          <br />
          <span className="text-bronze">A personal</span>
          <br />
          statement.
        </h2>
        <div className="md:col-span-5 md:pt-24">
          <p className="font-serif text-2xl leading-snug text-foreground/90">
            Every piece tells a story. From bold lettering to intricate black and grey compositions,
            we create tattoos that reflect individual identity, personal meaning and artistic vision.
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {["Custom work", "Walk-ins welcome", "Body piercing"].map((t) => (
              <span key={t} className="eyebrow border border-border px-3 py-2">{t}</span>
            ))}
          </div>
        </div>
        <figure className="md:col-span-5 md:col-start-2">
          <img src={work3} alt="Artist at work under a warm lamp (demo image)" width={1152} height={896} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <figcaption className="eyebrow mt-3">Behind the needle — demo image</figcaption>
        </figure>
        <figure className="md:col-span-4 md:col-start-8 md:-mt-24">
          <img src={work1} alt="Black and grey portrait detail (demo image)" width={896} height={1152} loading="lazy" className="aspect-[3/4] w-full object-cover" />
        </figure>
      </div>
    </section>
  );
}

function Gallery() {
  const [filter, setFilter] = useState("All");
  const [idx, setIdx] = useState<number | null>(null);
  const list = filter === "All" ? WORKS : WORKS.filter((w) => w.style === filter);

  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => (i === null ? i : (i + 1) % list.length));
      if (e.key === "ArrowLeft") setIdx((i) => (i === null ? i : (i - 1 + list.length) % list.length));
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [idx, list.length]);

  const cur = idx !== null ? list[idx] : null;

  return (
    <section id="tattoos" className="border-t border-border bg-graphite py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionMark n="02" label="Portfolio" />
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="headline text-6xl md:text-8xl">The work<br />speaks.</h2>
            <p className="mt-6 max-w-sm text-muted-foreground">
              Explore the details, the contrast and the character behind every piece.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3" role="tablist" aria-label="Filter by style">
            {STYLES.map((s) => (
              <button
                key={s}
                role="tab"
                aria-selected={filter === s}
                onClick={() => setFilter(s)}
                className={`eyebrow border-b pb-1 transition-colors ${
                  filter === s ? "border-bronze text-foreground" : "border-transparent hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid auto-rows-[260px] grid-cols-1 gap-3 sm:grid-cols-2 md:auto-rows-[300px] md:grid-cols-4">
          {list.map((w, i) => (
            <button
              key={w.src}
              onClick={() => setIdx(i)}
              className={`group relative overflow-hidden text-left ${filter === "All" ? w.span : ""}`}
              aria-label={`Open ${w.alt}`}
            >
              <img src={w.src} alt={w.alt} width={w.w} height={w.h} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background/90 to-transparent p-4 pt-16 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                <span className="eyebrow text-foreground">{w.style}</span>
                <ArrowUpRight className="h-4 w-4 text-bronze" />
              </span>
            </button>
          ))}
        </div>
        <p className="eyebrow mt-6">Demo images shown — to be replaced with the studio's real portfolio.</p>
      </div>

      {cur && (
        <div role="dialog" aria-modal="true" aria-label={cur.alt} className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4 backdrop-blur" onClick={() => setIdx(null)}>
          <img src={cur.src} alt={cur.alt} className="max-h-[82vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          <button aria-label="Close" className="absolute right-4 top-4 p-3" onClick={() => setIdx(null)}><X className="h-6 w-6" /></button>
          <button aria-label="Previous" className="absolute left-2 p-3" onClick={(e) => { e.stopPropagation(); setIdx((idx! - 1 + list.length) % list.length); }}><ChevronLeft className="h-8 w-8" /></button>
          <button aria-label="Next" className="absolute right-2 p-3" onClick={(e) => { e.stopPropagation(); setIdx((idx! + 1) % list.length); }}><ChevronRight className="h-8 w-8" /></button>
          <p className="eyebrow absolute bottom-6">{cur.style} · {idx! + 1} / {list.length}</p>
        </div>
      )}
    </section>
  );
}

function Artists() {
  return (
    <section id="artists" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <SectionMark n="03" label="Artists" />
      <div className="grid gap-14 md:grid-cols-2 md:items-end">
        <h2 className="headline text-6xl md:text-8xl">The hands<br />behind<br /><span className="text-bronze">the art.</span></h2>
        <div className="border-l border-border pl-8">
          <p className="font-serif text-2xl text-foreground/90">
            Artist profiles are coming soon.
          </p>
          <p className="mt-4 text-muted-foreground">
            Until then, follow the studio on Instagram to see each artist's latest work, or tell us
            what you have in mind and we'll point you to the right hands.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={IG_URL} target="_blank" rel="noreferrer" className="btn-line">@apt138studio <ArrowUpRight className="h-4 w-4" /></a>
            <a href="#quote" className="btn-line">Request a session</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { n: "01", t: "Custom Tattoos", d: "Pieces that start from your idea, references and preferences. Talk with us about placement, size, style and what's possible.", img: work3 },
  { n: "02", t: "Black & Grey", d: "Expression through contrast, depth, shading and monochrome detail.", img: work1 },
  { n: "03", t: "Lettering & Large-Scale", d: "Bold typographic work and larger projects across back, arms and legs.", img: hero },
  { n: "04", t: "Body Piercing", d: "Professional body piercing at the studio. Contact us for options and availability.", img: work2, id: "piercing" },
];

function Services() {
  return (
    <section className="border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionMark n="04" label="Services" />
        <h2 className="headline mb-16 text-6xl md:text-8xl">Your idea.<br />Our craft.</h2>
        <ul>
          {SERVICES.map((s) => (
            <li key={s.n} id={s.id} className="group grid scroll-mt-24 grid-cols-[auto_1fr] items-center gap-6 border-t border-border py-8 md:grid-cols-[4rem_1fr_1fr_8rem] md:gap-10">
              <span className="font-display text-xl text-bronze">{s.n}</span>
              <h3 className="headline text-4xl md:text-5xl">{s.t}</h3>
              <div className="col-span-2 md:col-span-1">
                <p className="text-muted-foreground">{s.d}</p>
                <a href="#quote" className="eyebrow mt-4 inline-flex items-center gap-2 text-foreground hover:text-bronze">Ask about it <ArrowRight className="h-3 w-3" /></a>
              </div>
              <img src={s.img} alt="" width={256} height={320} loading="lazy" className="hidden aspect-[4/5] w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 md:block" />
            </li>
          ))}
        </ul>
        <p className="eyebrow mt-8">Pricing depends on each project — request a quote.</p>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { t: "Share your idea", d: "Describe your idea and, if you like, add references, approximate size and placement." },
    { t: "Discuss the details", d: "The studio reviews your request and guides you on availability, artist, quote and next steps." },
    { t: "Confirm your session", d: "Once the details are agreed, you'll get instructions to finish your booking." },
  ];
  return (
    <section className="bg-graphite py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionMark n="05" label="Booking" />
        <h2 className="headline mb-16 text-5xl md:text-7xl">Let's bring<br />your idea to life.</h2>
        <ol className="grid gap-12 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="border-t border-bronze/50 pt-6">
              <span className="font-display text-6xl text-foreground/15">0{i + 1}</span>
              <h3 className="eyebrow mt-4 text-foreground">{s.t}</h3>
              <p className="mt-3 text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
        <a href="#quote" className="btn-solid mt-16">Start your booking <ArrowRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}

type Errors = Partial<Record<"name" | "contact" | "service" | "idea" | "consent", string>>;

function Quote() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const errs: Errors = {};
    if (!v("name")) errs.name = "Please enter your name.";
    if (!v("contact")) errs.contact = "Add an email or phone so we can reply.";
    if (!v("service")) errs.service = "Choose a service.";
    if (v("idea").length < 10) errs.idea = "Tell us a bit more about your idea.";
    if (!f.get("consent")) errs.consent = "Please confirm consent to continue.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const msg = [
      "Hi APT138! Quote request:",
      `Name: ${v("name")}`,
      `Contact: ${v("contact")}`,
      `Service: ${v("service")}`,
      v("placement") && `Placement: ${v("placement")}`,
      v("size") && `Approx. size: ${v("size")}`,
      v("artist") && `Preferred artist: ${v("artist")}`,
      `Idea: ${v("idea")}`,
      fileName && "(I'll attach my reference image here.)",
    ]
      .filter(Boolean)
      .join("\n");
    setMessage(msg);
    try {
      await navigator.clipboard.writeText(msg);
      setStatus("copied");
      window.open(IG_DM, "_blank", "noopener");
    } catch {
      setStatus("manual");
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? <p className="mt-2 text-sm text-destructive" role="alert">{errors[k]}</p> : null;

  return (
    <section id="quote" className="scroll-mt-20 mx-auto max-w-7xl px-6 py-28 md:py-40">
      <SectionMark n="06" label="Request a quote" />
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="headline text-5xl md:text-7xl">Tell us<br />about your<br /><span className="text-bronze">next piece.</span></h2>
          <p className="mt-8 text-muted-foreground">
            This form prepares your request and sends you to the studio's Instagram messages. Your
            details are copied so you can paste them into the chat and send — nothing is stored on
            this site.
          </p>
        </div>

        {status !== "idle" ? (
          <div className="border border-border p-8 md:col-span-7" role="status">
            <p className="eyebrow text-bronze">Almost there</p>
            <h3 className="headline mt-4 text-4xl">
              {status === "copied" ? "Your request is copied." : "Copy your request."}
            </h3>
            <p className="mt-4 text-muted-foreground">
              {status === "copied"
                ? "Paste it into the Instagram chat that just opened and hit send"
                : "Copy the text below, then paste it into an Instagram message to @apt138studio"}
              {fileName ? ", and attach your reference image there." : "."} Your request is only
              received once you send that message.
            </p>
            <pre className="mt-6 max-h-60 overflow-auto whitespace-pre-wrap bg-graphite p-4 text-sm text-foreground/80">{message}</pre>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={IG_DM} target="_blank" rel="noreferrer" className="btn-solid">Open Instagram chat</a>
              <button className="btn-line" onClick={() => setStatus("idle")}>Edit request</button>
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2 md:col-span-7">
            <label className="block">
              <span className="eyebrow">Full name *</span>
              <input name="name" className="field" autoComplete="name" aria-invalid={!!errors.name} />
              {err("name")}
            </label>
            <label className="block">
              <span className="eyebrow">Email or phone *</span>
              <input name="contact" className="field" autoComplete="email" aria-invalid={!!errors.contact} />
              {err("contact")}
            </label>
            <label className="block">
              <span className="eyebrow">Service *</span>
              <select name="service" defaultValue="" className="field bg-background" aria-invalid={!!errors.service}>
                <option value="" disabled>Select…</option>
                {SERVICES.map((s) => <option key={s.t}>{s.t}</option>)}
                <option>Not sure yet</option>
              </select>
              {err("service")}
            </label>
            <label className="block">
              <span className="eyebrow">Preferred artist (optional)</span>
              <input name="artist" className="field" />
            </label>
            <label className="block">
              <span className="eyebrow">Body placement</span>
              <input name="placement" className="field" placeholder="e.g. forearm" />
            </label>
            <label className="block">
              <span className="eyebrow">Approximate size</span>
              <input name="size" className="field" placeholder="e.g. 4 x 6 in" />
            </label>
            <label className="block sm:col-span-2">
              <span className="eyebrow">Your idea *</span>
              <textarea name="idea" rows={4} className="field resize-none" aria-invalid={!!errors.idea} />
              {err("idea")}
            </label>
            <label className="block sm:col-span-2">
              <span className="eyebrow">Reference image (optional)</span>
              <input type="file" accept="image/*" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} className="mt-3 block w-full text-sm text-muted-foreground file:mr-4 file:border file:border-border file:bg-transparent file:px-4 file:py-2 file:text-foreground" />
              <span className="mt-2 block text-xs text-muted-foreground">You'll attach it in the Instagram chat — images aren't uploaded here.</span>
            </label>
            <label className="flex items-start gap-3 sm:col-span-2">
              <input type="checkbox" name="consent" className="mt-1 accent-[var(--bronze)]" />
              <span className="text-sm text-muted-foreground">
                I agree that APT138 Studio may use the details I share only to reply to my request.
              </span>
            </label>
            {errors.consent && <div className="sm:col-span-2 -mt-6">{err("consent")}</div>}
            <button type="submit" className="btn-solid sm:col-span-2">Submit your request</button>
          </form>
        )}
      </div>
    </section>
  );
}

function WalkIns() {
  return (
    <section className="grain relative overflow-hidden border-t border-border bg-graphite py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2">
        <div>
          <SectionMark n="07" label="Walk-ins" />
          <h2 className="headline text-5xl md:text-7xl">In the<br />neighborhood?<br /><span className="text-bronze">Walk on in.</span></h2>
          <p className="mt-8 max-w-md text-muted-foreground">
            Walk-ins are welcome when availability allows. Stop by or contact the studio to check
            availability before your visit.
          </p>
        </div>
        <dl className="self-end">
          {[
            ["Days", "Tuesday — Saturday"],
            ["Hours", "1 PM — 7 PM"],
            ["Address", ADDRESS],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 border-t border-border py-5">
              <dt className="eyebrow">{k}</dt>
              <dd className="text-right font-serif text-2xl">{v}</dd>
            </div>
          ))}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="btn-solid">Get directions</a>
            <a href={IG_DM} target="_blank" rel="noreferrer" className="btn-line">Check availability</a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Availability depends on the day's schedule and demand.</p>
        </dl>
      </div>
    </section>
  );
}

function Policies() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-col justify-between gap-10 border border-border p-8 md:flex-row md:items-center md:p-12">
        <div>
          <p className="eyebrow text-bronze">Deposit</p>
          <p className="headline mt-4 text-4xl md:text-6xl">$100 deposit</p>
          <p className="mt-2 text-muted-foreground">Via Apple Pay / Cash App · arranged directly with the studio.</p>
        </div>
        <div className="max-w-sm">
          <p className="text-sm text-muted-foreground">
            For cancellations, rescheduling, late arrivals, session prep and age requirements, ask the
            studio before confirming your booking.
          </p>
          <a href={IG_DM} target="_blank" rel="noreferrer" className="btn-line mt-6">Ask about policies</a>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className="border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionMark n="08" label="Community" />
        <div className="grid gap-10 md:grid-cols-3">
          <h2 className="headline text-5xl md:col-span-2 md:text-7xl">Words from<br />the community.</h2>
          <p className="self-end text-muted-foreground">
            Client stories are on the way. For now, let the work and the people wearing it speak —
            see more on Instagram.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-3 gap-3">
          {[work2, work1, work3].map((s, i) => (
            <img key={i} src={s} alt="Studio work (demo image)" loading="lazy" className="aspect-square w-full object-cover" />
          ))}
        </div>
        <a href={IG_URL} target="_blank" rel="noreferrer" className="btn-line mt-10">See more on Instagram <ArrowUpRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}

const FAQS = [
  ["Do I need an appointment?", "Not always. Walk-ins are welcome Tuesday to Saturday, 1 PM – 7 PM, when availability allows. For custom or larger pieces, request a quote first."],
  ["How do I request a tattoo quote?", "Use the quote form on this page. It prepares your request and opens a chat with the studio on Instagram."],
  ["How much does a tattoo cost?", "Each piece is priced according to the project. Share your idea, size and placement to get a quote."],
  ["Is a deposit required?", "The studio has announced a $100 deposit via Apple Pay or Cash App. Confirm the details with the studio when booking."],
  ["Can I bring my own reference images?", "Yes — you can share references when you message the studio."],
  ["How should I prepare for my appointment?", "Contact the studio for preparation guidance before your session."],
  ["Do you offer body piercing?", "Yes, the studio offers body piercing. Contact us for options and availability."],
  ["How can I contact the studio?", "Message @apt138studio on Instagram or visit 452 E. 138th Street, Bronx, NY during opening hours."],
];

function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-graphite py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionMark n="09" label="FAQ" />
          <h2 className="headline text-5xl md:text-6xl">Good<br />questions.</h2>
        </div>
        <Accordion type="single" collapsible className="md:col-span-8">
          {FAQS.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-border">
              <AccordionTrigger className="py-6 text-left font-serif text-xl hover:no-underline md:text-2xl">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="grain relative overflow-hidden">
      <img src={work1} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background" />
      <div className="relative mx-auto max-w-7xl px-6 py-36 text-center md:py-52">
        <p className="eyebrow text-bronze">APT138 · Bronx</p>
        <h2 className="headline mt-8 text-6xl md:text-9xl">Your next piece<br />starts here.</h2>
        <p className="mx-auto mt-8 max-w-md text-muted-foreground">Bring your idea. Let's talk about the possibilities.</p>
        <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#quote" className="btn-solid">Request a quote</a>
          <a href={IG_URL} target="_blank" rel="noreferrer" className="btn-line">Visit our Instagram</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-graphite">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">
        <div>
          <p className="font-display text-5xl tracking-wider">APT138</p>
          <p className="eyebrow mt-1">Studio Tattoos</p>
        </div>
        <div>
          <p className="eyebrow mb-4 text-bronze">Visit</p>
          <p className="text-sm text-muted-foreground">{ADDRESS}<br />Tue — Sat · 1 PM — 7 PM</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-4 text-bronze">Explore</p>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} className="text-muted-foreground hover:text-foreground">{n.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-4 text-bronze">Follow</p>
          <a href={IG_URL} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">Instagram — @apt138studio</a>
          <p className="mt-6 text-xs text-muted-foreground">Privacy: this site doesn't store form data. Details you send by message are used only to reply to your request.</p>
        </div>
      </div>
      <p className="eyebrow border-t border-border px-6 py-6 text-center">APT138 Studio Tattoos — Bronx, New York.</p>
    </footer>
  );
}
