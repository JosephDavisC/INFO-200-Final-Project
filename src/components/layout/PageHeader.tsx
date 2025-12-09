import Image from "next/image";

export interface PageHeaderProps {
  title: string;
  subtitle: string;
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="bg-uw-purple text-white py-8 text-center">
      <div className="flex justify-center mb-4">
        <Image
          src="/uw-logo.png"
          alt="UW Logo"
          width={80}
          height={64}
          className="h-16 w-auto"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-white/90 font-semibold">{subtitle}</p>
    </header>
  );
}

export { PageHeader };
