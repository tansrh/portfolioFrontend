import PortfolioDetailPage from "@/components/ui/PortfolioDetails";
async function getPortfolioById(id: string) {
  return {
    title: "Portfolio " + id,
    description: "Details for portfolio " + id,
    updatedAt: "2025-07-20",
    sections: [
      { heading: "Experience", content: "..." },
      { heading: "Skills", content: "..." },
    ]
  };
}

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const portfolio = await getPortfolioById(id);
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-350 to-gray-50 bg-gray-50 dark:from-black dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-2xl mx-auto py-10 px-4">
        <PortfolioDetailPage portfolio={portfolio} />
      </div>
    </main>
  );
};

export default Page;