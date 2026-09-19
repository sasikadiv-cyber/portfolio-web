export default function SectionHeader({
  label,
  title,
  note,
}: {
  label: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-16 md:mb-20">
      <p data-reveal className="label mb-6">
        {label}
      </p>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-16">
        <h2
          className="t-mask max-w-xl text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.2] text-ink"
          style={{ ["--rv-delay" as string]: "80ms" }}
        >
          <span>{title}</span>
        </h2>
        {note && (
          <p
            data-reveal
            style={{ ["--rv-delay" as string]: "160ms" }}
            className="max-w-sm text-[14.5px] leading-[1.7] text-mute"
          >
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
