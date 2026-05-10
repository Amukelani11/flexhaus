"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-flex-black/10 overflow-hidden">
        <div className="relative h-[60vh] bg-flex-black flex items-end">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=80"
            alt="About FlexHaus"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-flex-black to-transparent" />
          <div className="relative z-10 px-6 pb-12 max-w-[1600px] mx-auto w-full">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-flex-white uppercase leading-none"
                style={{ fontSize: "clamp(2.5rem,8vw,6rem)", lineHeight: 0.95 }}
              >
                Who We<br /><span className="text-flex-yellow">Are.</span>
              </motion.h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-16 space-y-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-flex-black/10 rounded-sm overflow-hidden">
          <div className="p-10 border-r border-flex-black/10">
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-flex-black/50 mb-4">What We Do</p>
            <h2 className="font-display font-black text-[clamp(2rem,5vw,4rem)] uppercase leading-none mb-6">
              Heat,<br />without the noise.
            </h2>
            <p className="font-mono text-[12px] leading-relaxed text-flex-black/60 mb-4">
              South African resale with an eye on Louis Vuitton, Prada, Goyard, Nike, and the surrounding ecosystem.
              We buy carefully, check everything that comes through, and price fairly.
            </p>
            <p className="font-mono text-[12px] leading-relaxed text-flex-black/60">
              If we wouldn&apos;t wear it or stand next to it on a rail, it doesn&apos;t hit the site. Simple as that.
            </p>
          </div>
          <div className="relative aspect-square md:aspect-auto min-h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80"
              alt="FlexHaus Style"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { num: "16+", label: "Live SKUs" },
            { num: "QC", label: "Every Order" },
            { num: "SA", label: "Shipping" },
            { num: "24h", label: "Typical reply" },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-50 rounded-sm p-8 hover:bg-flex-yellow-bright transition-colors duration-200">
              <p className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] leading-none">{stat.num}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-flex-black/50 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-flex-black/50 mb-6">What We Carry</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Louis Vuitton", desc: "Bags, wallets, belts, accessories in Monogram & Damier" },
              { name: "Prada", desc: "Re-Nylon bags, sunglasses, hats from Milan's finest" },
              { name: "Goyard", desc: "Saint Louis totes, card holders in iconic Goyardine" },
              { name: "Nike", desc: "Air Force 1s, Dunk Lows, Tech Fleece, Club hoodies" },
              { name: "Calvin Klein", desc: "Premium cotton boxer briefs — the everyday essential" },
              { name: "Versace & DG", desc: "Medusa logo underwear — Italian luxury daily" },
            ].map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 bg-gray-50 rounded-sm hover:bg-flex-yellow-bright transition-colors duration-200"
              >
                <p className="font-display font-black text-xl uppercase">{brand.name}</p>
                <p className="font-mono text-[10px] leading-relaxed text-flex-black/50 mt-2">{brand.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-flex-black text-flex-white p-12 text-center rounded-sm mt-8">
          <h2 className="font-display font-black text-[clamp(2rem,5vw,4rem)] uppercase leading-none text-flex-yellow mb-3">
            Ready to Get Flexed?
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-flex-white/40 mb-8">
            Current stock updates as pieces land.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-flex-yellow-bright text-flex-black font-display font-black text-[12px] uppercase tracking-[0.3em] px-10 py-4 hover:bg-white transition-colors rounded-sm"
          >
            Shop the Drop <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
