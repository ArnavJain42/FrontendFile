import {
  CheckCircle,
  Upload,
  Users,
  BarChart3,
  Lock,
  Globe,
  Cloud,
} from "lucide-react";

export function Landing() {
  const coreDeliverables = [
    "User Authentication & Authorization",
    "Drag & Drop Multi-File Upload",
    "Content-Addressed Deduplication",
    "Advanced File Search & Filtering",
    "Storage Analytics & Quota Management",
    "Admin Panel & System Overview",
    "Responsive Glassmorphism UI",
    "Rate Limiting & Security",
  ];

  const bonusDeliverables = [
    "Real-time Upload Progress",
    "File Preview & Metadata",
    "Public/Private File Sharing",
    "Interactive Storage Charts",
    "Mobile-Optimized Interface",
    "Advanced File Management",
    "System-wide Statistics",
    "Modern Glass Design",
  ];

  // Dynamic Bento Items
  const bentoItems = [
    {
      icon: <Upload className="w-8 h-8 text-blue-400" />,
      title: "SMART UPLOAD SYSTEM",
      desc:
        "Drag & drop, auto deduplication, real-time tracking for efficient storage.",
      span: "lg:col-span-2", // spans 2 columns on lg+
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-purple-400" />,
      title: "ANALYTICS",
      desc: "Storage usage insights & stats",
    },
    {
      icon: <Lock className="w-10 h-10 text-green-400" />,
      title: "SECURITY",
      desc: "Enterprise-grade encryption",
    },
    {
      icon: <Users className="w-10 h-10 text-orange-400" />,
      title: "FILE MANAGEMENT",
      desc: "Easily organize files into folders, share securely with custom permissions, and manage versions seamlessly across your workspace.",
      span: "lg:row-span-2", // spans 2 rows on lg+
    },
    {
      icon: <Globe className="w-10 h-10 text-pink-400" />,
      title: "MOBILE READY",
      desc: "Responsive design for all devices",
    },
    {
      icon: <Cloud className="w-10 h-10 text-blue-300" />,
      title: "CLOUD SYNC",
      desc: "Cross-device synchronization",
    },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
        background:
          "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400&display=swap');
        .bebas-neue { font-family: 'Bebas Neue', cursive; }
        .glass-bento {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .glass-bento:hover {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(147, 197, 253, 0.1);
          transform: translateY(-8px);
        }
        .apple-gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Subtle background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* HEADER */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-12">
        <div className="flex items-center space-x-3">
          <img src="/favicon.png" alt="balkanID Logo" className="h-10 w-auto" />
          <span className="bebas-neue text-xl text-white tracking-wide">
            balkanID
          </span>
        </div>

        {/* <nav className="hidden md:flex item-center  space-x-8 text-gray-300 text-base">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#bonus" className="hover:text-white">Bonus</a>
          <a href="#demo" className="hover:text-white">Demo</a>
        </nav> */}

        <button
          className="bg-white text-black px-6 py-2 rounded-xl shadow-lg font-semibold hover:bg-gray-200 transition"
          onClick={() => (window.location.href = "/login")}
        >
          Click Here for Secure File Vault
        </button>
      </header>

      {/* HERO */}
      <div className="relative z-10 text-center mt-8 sm:mt-12 px-4">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl bebas-neue apple-gradient-text mb-4 leading-tight tracking-tight">
          Secure File Vault
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 mb-10">
          from <span className="font-semibold text-blue-400">Arnav Jain</span>
        </p>
      </div>

      {/* BENTO GRID */}
      <section className="relative z-10 
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
        auto-rows-[minmax(220px,1fr)] gap-6 
        px-6 mb-16 max-w-7xl mx-auto">
        {bentoItems.map((item, i) => (
          <div
            key={i}
            className={`rounded-3xl p-8 glass-bento flex flex-col justify-between ${item.span || ""}`}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl bebas-neue apple-gradient-text mb-2">
              {item.title}
            </h3>
            <p className="text-gray-400 text-base">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* CORE FEATURES */}
      <section id="features" className="relative z-10 px-6 mb-16">
        <h2 className="text-3xl bebas-neue apple-gradient-text text-center mb-8">
          CORE FEATURES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {coreDeliverables.map((item, index) => (
            <div key={index} className="flex items-center text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* BONUS DELIVERABLES */}
      <section id="bonus" className="relative z-10 px-6 mb-16">
        <h2 className="text-3xl bebas-neue apple-gradient-text text-center mb-8">
          BONUS DELIVERABLES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {bonusDeliverables.map((item, index) => (
            <div key={index} className="flex items-center text-gray-300">
              <CheckCircle className="w-5 h-5 text-purple-400 mr-3" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* DEMO CREDENTIALS */}
      <section id="demo" className="relative z-10 px-6 mb-16">
        <h2 className="text-3xl bebas-neue apple-gradient-text text-center mb-8">
          DEMO ACCESS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-black/40 rounded-2xl p-6 border border-gray-600">
            <p className="text-blue-300 bebas-neue text-lg mb-2">REGULAR USER</p>
            <p className="text-gray-400">
              Email: <span className="text-white font-mono">user@example.com</span>
            </p>
            <p className="text-gray-400">
              Password: <span className="text-white font-mono">demo123</span>
            </p>
          </div>
          <div className="bg-black/40 rounded-2xl p-6 border border-gray-600">
            <p className="text-purple-300 bebas-neue text-lg mb-2">ADMIN USER</p>
            <p className="text-gray-400">
              Email: <span className="text-white font-mono">admin@example.com</span>
            </p>
            <p className="text-gray-400">
              Password: <span className="text-white font-mono">demo123</span>
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-8 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} BalkanID | Built with React + TypeScript +
          Tailwind
        </p>
      </footer>
    </div>
  );
}
