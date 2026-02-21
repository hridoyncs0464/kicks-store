import ShoeCard from '../products/ShoeCard';

const RecommendedProducts = ({ products, title = "You may also like" }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 uppercase">
            {title}
          </h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-gray-400 hover:bg-gray-500 rounded-lg flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-lg flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {products.map((product) => (
            <ShoeCard key={product.id} product={product} showNewBadge={false} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
