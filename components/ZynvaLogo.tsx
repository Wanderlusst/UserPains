interface ZynvaLogoProps {
  className?: string
  size?: number
}

export default function ZynvaLogo({ className = '', size = 48 }: ZynvaLogoProps) {
  return (
    <img
      src="/Zynva-18.svg"
      alt="Zynva Logo"
      width={size}
      height={size}
      className={className}
    />
  )
}
