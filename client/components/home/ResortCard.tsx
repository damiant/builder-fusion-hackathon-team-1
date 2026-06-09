import { motion, MotionValue, useTransform } from "framer-motion";
import { springs } from "@/lib/springTokens";
import type { Property } from "@/lib/content";

interface ResortCardProps {
  property: Property;
  index: number;
  activeIndex: number;
  total: number;
  parallaxX: MotionValue<number>;
  cardWidth: number;
  gap: number;
}

export function ResortCard({
  property,
  index,
  activeIndex,
  total,
  parallaxX,
  cardWidth,
  gap,
}: ResortCardProps) {
  const offset = index - activeIndex;
  const isActive = offset === 0;

  // Parallax coefficient per depth layer
  const coefficient = isActive ? 1.0 : Math.abs(offset) === 1 ? 0.75 : 0.5;

  const x = useTransform(parallaxX, (v) => v * coefficient);

  const baseX = offset * (cardWidth + gap);

  const scale = isActive ? 1.0 : 0.88;
  const rotate = offset < 0 ? -7 : offset > 0 ? 7 : 0;
  const zIndex = total - Math.abs(offset);
  const opacity = Math.abs(offset) > 1 ? 0.4 : 1;

  return (
    <motion.div
      role="group"
      aria-roledescription="slide"
      aria-label={`${property.name}, ${index + 1} of ${total}`}
      aria-current={isActive ? "true" : undefined}
      style={{
        position: "absolute",
        left: "50%",
        width: cardWidth,
        x: baseX,
        marginLeft: -(cardWidth / 2),
        zIndex,
      }}
      animate={{
        scale,
        rotate,
        opacity,
      }}
      transition={springs.CardRush}
    >
      {/* Parallax inner wrapper */}
      <motion.div style={{ x }} className="w-full">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ height: cardWidth * 1.42 }}
        >
          {/* Property image */}
          <img
            src={property.imageUrl}
            alt={`${property.name} — exterior`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.75) 100%)",
            }}
          />

          {/* Decorative shimmer on active card */}
          {isActive && (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
              }}
            />
          )}

          {/* Property info */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            {property.logoUrl ? (
              <img
                src={property.logoUrl}
                alt={property.name}
                className="h-7 w-auto mb-2 object-contain object-left"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  const el = e.target as HTMLImageElement;
                  const sibling = el.nextElementSibling as HTMLElement | null;
                  if (sibling) sibling.style.display = "block";
                }}
              />
            ) : null}
            <p className="text-white font-bold text-lg leading-tight">
              {property.shortName}
            </p>
            <p className="text-white/60 text-xs mt-0.5">{property.tagline}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
