import ServicesSection from "@/components/ui/services";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function DemoOne() {
  return <ServicesSection />;
}

function DefaultToggle() {
  return (
    <div className="space-y-2 text-center">
      <div className="flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  );
}

export { DefaultToggle };
