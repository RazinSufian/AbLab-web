import Navbar from "@/components/customUi/Navber";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar></Navbar>
      <div className="ml-20 md:ml-64">{children}</div>
    </section>
  );
}
