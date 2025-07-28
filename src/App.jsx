import React, { useState, useEffect, createContext, useContext } from 'react';

// Import images from your assets folder
import heroDrivers from './assets/images/f1-hero-drivers.jpg';
import mercedesTee from './assets/images/mercedes-tee.png';
import redbullCap from './assets/images/redbull-cap.png';
import ferrariJacket from './assets/images/ferrari-jacket.png';
import mclarenHoodie from './assets/images/mclaren-hoodie.png';
import astonPolo from './assets/images/aston-martin-polo.png';
import alpineCap from './assets/images/alpine-cap.png';
import ferrariCap from './assets/images/ferrari-cap.png';
import redbullModel from './assets/images/redbull-model.png';
import hamiltonHelmet from './assets/images/hamilton-helmet.png';
import mclarenBag from './assets/images/mclaren-bag.png';
import williamsBeanie from './assets/images/williams-beanie.png';
import vcarbTee from './assets/images/vcarb-tee.png';
import ferrariLogo from './assets/images/ferrari-logo.png';
import redbullLogo from './assets/images/redbull-logo.png';
import mercedesLogo from './assets/images/mercedes-logo.png';
import mclarenLogo from './assets/images/mclaren-logo.png';
import lewisHamilton from './assets/images/lewis-hamilton.png';
import landoNorris from './assets/images/lando-norris.png';
import maxVerstappen from './assets/images/max-verstappen.png';
import charlesLeclerc from './assets/images/charles-leclerc.png';

// Product and team information with prices in INR
const productsData = [
  {
    id: 1,
    name: 'Mercedes-AMG Petronas 2024 Team T-Shirt',
    price: 1499,
    team: 'Mercedes',
    category: 'Apparel',
    image: mercedesTee,
    featured: true,
    description:
      'Official team t-shirt for the 2024 season, made from breathable cotton.',
  },
  {
    id: 2,
    name: 'Oracle Red Bull Racing 2024 Max Verstappen Cap',
    price: 999,
    team: 'Red Bull',
    category: 'Caps',
    image: redbullCap,
    featured: true,
    description:
      'Show your support for the World Champion with this stylish 2024 team cap.',
  },
  {
    id: 3,
    name: 'Scuderia Ferrari 2024 Team Jacket',
    price: 3999,
    team: 'Ferrari',
    category: 'Apparel',
    image: ferrariJacket,
    featured: true,
    description:
      'A premium team jacket featuring sponsor logos and the iconic Scudetto shield.',
  },
  {
    id: 4,
    name: 'McLaren F1 Team 2024 Lando Norris Hoodie',
    price: 2499,
    team: 'McLaren',
    category: 'Apparel',
    image: mclarenHoodie,
    featured: true,
    description:
      "A comfortable hoodie dedicated to McLaren's star driver, Lando Norris.",
  },
  {
    id: 5,
    name: 'Aston Martin F1 Team 2024 Polo Shirt',
    price: 1999,
    team: 'Aston Martin',
    category: 'Apparel',
    image: astonPolo,
    description:
      "A classic polo shirt in Aston Martin's signature racing green.",
  },
  {
    id: 6,
    name: 'BWT Alpine F1 Team 2024 Esteban Ocon Cap',
    price: 799,
    team: 'Alpine',
    category: 'Caps',
    image: alpineCap,
    description: 'The official 2024 team cap for French driver Esteban Ocon.',
  },
  {
    id: 7,
    name: 'Scuderia Ferrari 2024 Charles Leclerc Cap',
    price: 1199,
    team: 'Ferrari',
    category: 'Caps',
    image: ferrariCap,
    description:
      'Support driver Charles Leclerc with his official 2024 driver cap.',
  },
  {
    id: 8,
    name: 'Oracle Red Bull Racing 1:43 Model Car',
    price: 2999,
    team: 'Red Bull',
    category: 'Models',
    image: redbullModel,
    description:
      'A highly detailed 1:43 scale model of the Red Bull Racing F1 car.',
  },
  {
    id: 9,
    name: 'Mercedes-AMG Petronas 1:2 Lewis Hamilton Helmet',
    price: 3499,
    team: 'Mercedes',
    category: 'Models',
    image: hamiltonHelmet,
    description: 'A 1:2 scale replica of the helmet worn by Lewis Hamilton.',
  },
  {
    id: 10,
    name: 'McLaren F1 Team 2024 Team Backpack',
    price: 1799,
    team: 'McLaren',
    category: 'Accessories',
    image: mclarenBag,
    description:
      'Carry your essentials in style with this official McLaren F1 team backpack.',
  },
  {
    id: 11,
    name: 'Williams Racing 2024 Team Beanie',
    price: 899,
    team: 'Williams',
    category: 'Accessories',
    image: williamsBeanie,
    description:
      'Keep warm with this classic beanie from the Williams Racing team.',
  },
  {
    id: 12,
    name: 'Visa Cash App RB F1 Team T-Shirt',
    price: 1299,
    team: 'Visa Cash App RB',
    category: 'Apparel',
    image: vcarbTee,
    description:
      'The official team t-shirt for the Visa Cash App RB Formula One Team.',
  },
];
const teamsData = [
  { name: 'Ferrari', logo: ferrariLogo, bg: 'bg-red-600' },
  { name: 'Red Bull', logo: redbullLogo, bg: 'bg-blue-800' },
  { name: 'Mercedes', logo: mercedesLogo, bg: 'bg-cyan-500' },
  { name: 'McLaren', logo: mclarenLogo, bg: 'bg-orange-500' },
];
const driversData = [
  { name: 'Lewis Hamilton', image: lewisHamilton },
  { name: 'Lando Norris', image: landoNorris },
  { name: 'Max Verstappen', image: maxVerstappen },
  { name: 'Charles Leclerc', image: charlesLeclerc },
];
const categories = [...new Set(productsData.map((p) => p.category))];

// Context for managing state
const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const exist = prev.find((i) => i.id === product.id);
      if (exist) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const login = (email) => setCurrentUser({ email });
  const logout = () => setCurrentUser(null);

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    subtotal,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    currentUser,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Reusable Components
const ProductCard = ({ product, navigate, onQuickView }) => {
  const { addToCart } = useAppContext();
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };
  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <div
      onClick={() => navigate('productDetail', product.id)}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group flex flex-col"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-red-600 text-white text-sm font-bold px-3 py-1 m-2 rounded-full">
          ₹{product.price}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleQuickView}
            className="bg-white/90 text-black font-bold py-2 px-4 rounded-lg text-sm uppercase tracking-wider backdrop-blur-sm"
          >
            Quick View
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white truncate group-hover:text-yellow-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-400 mb-4">{product.team}</p>
        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg uppercase tracking-wider transition-transform duration-300 transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useAppContext();
  if (!product) return null;
  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#061231] rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <button
            onClick={onClose}
            className="self-end text-gray-400 hover:text-white text-2xl font-bold"
          >
            &times;
          </button>
          <span className="text-sm font-semibold text-red-500 uppercase">
            {product.team}
          </span>
          <h2 className="text-3xl font-bold text-white my-2">{product.name}</h2>
          <p className="text-3xl font-bold text-yellow-400 mb-4">
            ₹{product.price}
          </p>
          <p className="text-gray-300 leading-relaxed mb-6 flex-grow overflow-y-auto">
            {product.description}
          </p>
          <button
            onClick={handleAddToCart}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wider"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoModal = ({ title, children, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <div
      className="bg-[#121a3e] border border-blue-900/50 rounded-lg shadow-2xl w-full max-w-md"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center p-4 border-b border-blue-900/50">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-2xl font-bold"
        >
          &times;
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

// Page Components
const HomePage = ({ navigate, onQuickView }) => {
  const featuredProducts = productsData.filter((p) => p.featured);
  return (
    <div className="space-y-20">
      <div className="relative h-[500px] -mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
        <img
          src={heroDrivers}
          alt="F1 Drivers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061231] via-[#061231]/70 to-transparent"></div>
        <div className="absolute inset-0 flex items-end justify-start p-8 md:p-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Gear Up for Race Day
            </h1>
            <p className="mt-2 text-lg text-gray-300 max-w-lg">
              The official store for all your favorite Formula 1 team
              merchandise.
            </p>
            <button
              onClick={() => navigate('products')}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider transition-transform duration-300 transform hover:scale-105"
            >
              Shop All Collections
            </button>
          </div>
        </div>
      </div>
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Shop By Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamsData.map((team) => (
            <div
              key={team.name}
              onClick={() => navigate('products', { team: team.name })}
              className={`relative h-48 rounded-lg flex items-center justify-center p-6 cursor-pointer overflow-hidden group ${team.bg}`}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
              <img
                src={team.logo}
                alt={`${team.name} Logo`}
                className="h-16 w-auto object-contain relative z-10 drop-shadow-lg transition-transform group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Trending Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              navigate={navigate}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Popular Drivers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {driversData.map((driver) => (
            <div
              key={driver.name}
              className="relative rounded-lg overflow-hidden group cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={driver.image}
                  alt={driver.name}
                  className="w-full h-80 object-cover object-top transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-2xl font-bold text-white">{driver.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ProductsPage = ({ navigate, initialFilters, onQuickView }) => {
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [teamFilter, setTeamFilter] = useState(initialFilters?.team || 'all');
  const [categoryFilter, setCategoryFilter] = useState(
    initialFilters?.category || 'all'
  );
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let products = productsData;
    if (teamFilter !== 'all') {
      products = products.filter((p) => p.team === teamFilter);
    }
    if (categoryFilter !== 'all') {
      products = products.filter((p) => p.category === categoryFilter);
    }
    if (searchTerm) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(products);
  }, [teamFilter, categoryFilter, searchTerm, initialFilters]);

  useEffect(() => {
    setTeamFilter(initialFilters?.team || 'all');
    setCategoryFilter(initialFilters?.category || 'all');
  }, [initialFilters]);

  const resetFilters = () => {
    setTeamFilter('all');
    setCategoryFilter('all');
    setSearchTerm('');
  };
  const allTeams = [...new Set(productsData.map((p) => p.team))];
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">All Merchandise</h1>
      <div className="bg-blue-900/50 p-4 rounded-lg mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label
              htmlFor="team-filter"
              className="text-sm font-medium text-gray-300 mr-2"
            >
              Team:
            </label>
            <select
              id="team-filter"
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="bg-blue-800 border-blue-700 text-white rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400"
            >
              <option value="all">All Teams</option>
              {allTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="category-filter"
              className="text-sm font-medium text-gray-300 mr-2"
            >
              Category:
            </label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-blue-800 border-blue-700 text-white rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-blue-800 border-blue-700 text-white rounded-md p-2 pl-8 focus:ring-yellow-400 focus:border-yellow-400"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <button
          onClick={resetFilters}
          className="w-full md:w-auto bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Reset
        </button>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              navigate={navigate}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-300">
            No Products Found
          </h3>
          <p className="text-gray-500 mt-2">
            Your search for "{searchTerm}" did not match any products.
          </p>
        </div>
      )}
    </div>
  );
};

const ProductDetailPage = ({ productId, navigate }) => {
  const { addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const product = productsData.find((p) => p.id === productId);
  if (!product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-white">Product not found!</h2>
        <button
          onClick={() => navigate('products')}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Back to Products
        </button>
      </div>
    );
  }
  return (
    <div>
      <button
        onClick={() => navigate('products')}
        className="mb-8 text-yellow-400 hover:text-yellow-300 font-semibold"
      >
        &larr; Back to all products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-blue-900/50 rounded-lg p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-red-500 uppercase">
            {product.team}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white my-2">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-white mb-4">₹{product.price}</p>
          <p className="text-gray-300 leading-relaxed mb-6">
            {product.description}
          </p>
          <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-700">
            <div className="flex items-center border border-gray-600 rounded-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-white font-bold hover:bg-gray-700"
              >
                -
              </button>
              <span className="px-4 py-2 text-white">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 text-white font-bold hover:bg-gray-700"
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart(product, quantity)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wider"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Authentication Pages
const AuthPageLayout = ({ title, children }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-full max-w-md p-8 space-y-6 bg-[#121a3e]/80 rounded-lg shadow-xl border border-blue-900/50">
      <h2 className="text-3xl font-bold text-center text-white">{title}</h2>
      {children}
    </div>
  </div>
);

const LoginPage = ({ navigate }) => {
  const { login } = useAppContext();
  const handleLogin = (e) => {
    e.preventDefault();
    login('user@raceify.com');
    navigate('home');
  };
  return (
    <AuthPageLayout title="Login">
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="text-sm font-bold text-gray-300 block mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-800 focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-300 block mb-2">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-800 focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>
        <div className="text-right">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('forgotPassword');
            }}
            className="text-sm text-yellow-400 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white font-bold uppercase"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-400">
          Don't have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('signup');
            }}
            className="font-bold text-yellow-400 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </form>
    </AuthPageLayout>
  );
};

const SignUpPage = ({ navigate }) => {
  const { login } = useAppContext();
  const handleSignUp = (e) => {
    e.preventDefault();
    login('user@raceify.com');
    navigate('home');
  };
  return (
    <AuthPageLayout title="Create Account">
      <form onSubmit={handleSignUp} className="space-y-6">
        <div>
          <label className="text-sm font-bold text-gray-300 block mb-2">
            Full Name
          </label>
          <input
            type="text"
            required
            className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-800 focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-300 block mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-800 focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-300 block mb-2">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-800 focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white font-bold uppercase"
        >
          Sign Up
        </button>
        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('login');
            }}
            className="font-bold text-yellow-400 hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </AuthPageLayout>
  );
};

const ForgotPasswordPage = ({ navigate }) => {
  const [step, setStep] = useState(1);
  const handleSendOtp = (e) => {
    e.preventDefault();
    setStep(2);
  };
  const handleReset = (e) => {
    e.preventDefault();
    alert('Password has been reset successfully!');
    navigate('login');
  };

  return (
    <AuthPageLayout title="Reset Password">
      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <p className="text-sm text-gray-300">
            Enter your email address and we'll send you an OTP to reset your
            password.
          </p>
          <div>
            <label className="text-sm font-bold text-gray-300 block mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-800 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white font-bold uppercase"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleReset} className="space-y-6">
          <p className="text-sm text-gray-300">
            An OTP has been sent to your email. Please enter it below to reset
            your password.
          </p>
          <div>
            <label className="text-sm font-bold text-gray-300 block mb-2">
              OTP
            </label>
            <input
              type="text"
              required
              className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-800 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-300 block mb-2">
              New Password
            </label>
            <input
              type="password"
              required
              className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-800 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white font-bold uppercase"
          >
            Reset Password
          </button>
        </form>
      )}
    </AuthPageLayout>
  );
};

// Layout Components
const TopBar = () => (
  <div className="bg-[#061231] text-white text-xs text-center py-2">
    <p>FREE SHIPPING ON ALL ORDERS OVER ₹5000</p>
  </div>
);

const Header = ({ navigate }) => {
  const { openCart, cartCount, currentUser, logout } = useAppContext();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-[#121a3e]/80 backdrop-blur-sm sticky top-0 z-40 shadow-lg shadow-black/20 border-b border-blue-900/50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('home');
            }}
            className="text-3xl font-black text-white tracking-wider"
          >
            RACE<span className="text-yellow-400">IFY</span>
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('home');
              }}
              className="text-gray-300 hover:text-white font-medium"
            >
              Home
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('products');
              }}
              className="text-gray-300 hover:text-white font-medium"
            >
              All Products
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={openCart}
              className="relative text-gray-300 hover:text-white p-2 rounded-full hover:bg-blue-800 transition-colors"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {currentUser ? (
              <button
                onClick={() => logout()}
                className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-blue-800 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => navigate('login')}
                className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-blue-800 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white p-2 rounded-md hover:bg-blue-800"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('home');
                setMobileMenuOpen(false);
              }}
              className="block text-gray-300 hover:text-white py-2"
            >
              Home
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('products');
                setMobileMenuOpen(false);
              }}
              className="block text-gray-300 hover:text-white py-2"
            >
              All Products
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

const Footer = ({ navigate, onContactClick, onShippingClick }) => (
  <footer className="bg-[#061231] border-t border-blue-900/50">
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Shop
          </h3>
          <ul className="mt-4 space-y-4">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('products');
                }}
                className="text-base text-gray-300 hover:text-white"
              >
                All Products
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('products', { category: 'Apparel' });
                }}
                className="text-base text-gray-300 hover:text-white"
              >
                Apparel
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('products', { category: 'Caps' });
                }}
                className="text-base text-gray-300 hover:text-white"
              >
                Caps
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('products', { category: 'Models' });
                }}
                className="text-base text-gray-300 hover:text-white"
              >
                Models
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Teams
          </h3>
          <ul className="mt-4 space-y-4">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('products', { team: 'Ferrari' });
                }}
                className="text-base text-gray-300 hover:text-white"
              >
                Ferrari
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('products', { team: 'Red Bull' });
                }}
                className="text-base text-gray-300 hover:text-white"
              >
                Red Bull
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('products', { team: 'Mercedes' });
                }}
                className="text-base text-gray-300 hover:text-white"
              >
                Mercedes
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('products', { team: 'McLaren' });
                }}
                className="text-base text-gray-300 hover:text-white"
              >
                McLaren
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Support
          </h3>
          <ul className="mt-4 space-y-4">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onContactClick();
                }}
                className="text-base text-gray-300 hover:text-white"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onShippingClick();
                }}
                className="text-base text-gray-300 hover:text-white"
              >
                Shipping & Returns
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            About Raceify
          </h3>
          <p className="mt-4 text-base text-gray-300">
            Raceify: Where Formula 1 Fans Go From Zero to 100.. Official gear,
            no pit stops, just pure speed.
          </p>
        </div>
      </div>
      <div className="mt-8 border-t border-blue-900/50 pt-8 text-center">
        <p className="text-base text-gray-400">
          &copy; 2024 Raceify. Created for portfolio purposes.
        </p>
      </div>
    </div>
  </footer>
);

const CartSidebar = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    subtotal,
    removeFromCart,
    updateQuantity,
  } = useAppContext();
  return (
    <div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#061231] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-blue-900/50">
          <h2 className="text-2xl font-bold text-white">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
            <svg
              className="w-16 h-16 text-gray-600 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-white">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mt-2">Add some gear to get started!</p>
          </div>
        ) : (
          <>
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-sm text-gray-400">₹{item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 py-1 border border-gray-600 rounded-l-md hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-t border-b border-gray-600">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 border border-gray-600 rounded-r-md hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">
                      ₹{item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-500 hover:text-red-400 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-blue-900/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-300">
                  Subtotal
                </span>
                <span className="text-2xl font-bold text-white">
                  ₹{subtotal}
                </span>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg uppercase">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [page, setPage] = useState({ name: 'home', props: {} });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isShippingModalOpen, setShippingModalOpen] = useState(false);

  const navigate = (pageName, props = {}) => {
    setPage({ name: pageName, props });
    window.scrollTo(0, 0);
  };
  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };
  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const renderPage = () => {
    const pageProps = { navigate, onQuickView: handleQuickView };
    switch (page.name) {
      case 'products':
        return <ProductsPage {...pageProps} initialFilters={page.props} />;
      case 'productDetail':
        return <ProductDetailPage productId={page.props} navigate={navigate} />;
      case 'login':
        return <LoginPage navigate={navigate} />;
      case 'signup':
        return <SignUpPage navigate={navigate} />;
      case 'forgotPassword':
        return <ForgotPasswordPage navigate={navigate} />;
      case 'home':
      default:
        return <HomePage {...pageProps} />;
    }
  };

  return (
    <AppProvider>
      <div className="bg-[#061231] text-gray-100 font-sans">
        <TopBar />
        <Header navigate={navigate} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderPage()}
        </main>
        <CartSidebar />
        <Footer
          navigate={navigate}
          onContactClick={() => setContactModalOpen(true)}
          onShippingClick={() => setShippingModalOpen(true)}
        />
        <QuickViewModal product={quickViewProduct} onClose={closeQuickView} />

        {isContactModalOpen && (
          <InfoModal
            title="Contact Us"
            onClose={() => setContactModalOpen(false)}
          >
            <p className="text-gray-300 mb-4">
              You can connect with the creator on LinkedIn:
            </p>
            <a
              href="https://www.linkedin.com/in/sfurqan6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Visit LinkedIn Profile
            </a>
          </InfoModal>
        )}
        {isShippingModalOpen && (
          <InfoModal
            title="Shipping & Returns"
            onClose={() => setShippingModalOpen(false)}
          >
            <p className="text-gray-300 text-center">
              Well, you purchased it, so… it’s yours now. No returns.
            </p>
          </InfoModal>
        )}
      </div>
    </AppProvider>
  );
}

export default App;
