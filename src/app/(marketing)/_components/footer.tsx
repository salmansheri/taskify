import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";

const Footer = () => {
  return (
    <header className="fixed bottom-0 w-full  p-4 border-t shadow bg-slate-100 flex items-center ">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between ">
        <Logo />
        <nav className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="ghost">
            Privary Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Footer;
