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
        className="relative flex items-center justify-center w-full aspect-square max-w-[120px] bg-navy-dark border border-sky-brand/30"
        style={{ boxShadow: 'inset 0 1px 0 rgba(0,159,227,0.15)' }}
      >
        <span
          className="font-verlag text-3xl md:text-5xl text-white tabular-nums"
          style={{ fontFamily: 'Verlag Black, sans-serif', textTransform: 'uppercase' }}
        >
          {display}
        </span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-sky-brand/10" />
      </div>
      <span className={`mt-2 text-xs md:text-sm font-montserrat font-bold tracking-widest ${labelColor} uppercase`}>
        {label}
      </span>
    </div>
  )
}
