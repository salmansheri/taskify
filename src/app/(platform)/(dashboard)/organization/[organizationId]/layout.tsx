import OrgControl from "./_components/org-control";

export default function SingleOrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}
