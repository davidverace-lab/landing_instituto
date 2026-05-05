interface Props {
  value: number
  label: string
  labelColor?: string
}

export default function CountdownUnit({ value, label, labelColor = 'text-sky-brand' }: Props) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center w-full">
      <div
        className="relative flex items-center justify-center w-full aspect-square max-w-[140px] border border-sky-brand/30"
        style={{ boxShadow: 'inset 0 1px 0 rgba(0,159,227,0.15)', padding: '0.75rem', backgroundColor: '#FFC627' }}
      >
        <span
          style={{
            fontFamily: 'Verlag Black, sans-serif',
            textTransform: 'uppercase',
            fontVariantNumeric: 'tabular-nums',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1,
            color: '#002E6D',
            letterSpacing: '-0.02em',
          }}
        >
          {display}
        </span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-sky-brand/10" />
      </div>
      <span
        className={`mt-3 font-montserrat font-bold uppercase ${labelColor}`}
        style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.875rem)', letterSpacing: '0.12em' }}
      >
        {label}
      </span>
    </div>
  )
}
