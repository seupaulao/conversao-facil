import { IonIcon } from "@ionic/react";

interface CategoryCardProps {
  title: string;
  icon: string;
  color: string;
  selected?: boolean;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon, color, selected = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        minWidth: 60,
        width: 60,
        padding: 10,
        borderRadius: 16,
        background: color,
        textAlign: "center",
        cursor: "pointer",
        border: selected ? "2px solid #888" : "2px solid transparent",
        transition: "all 0.2s ease",
        transform: selected ? "scale(1.05)" : "scale(1)",
      }}
    >
      <IonIcon icon={icon} size="medium" />
      <p style={{ fontSize: 11, margin: "6px 0 0 0", fontWeight: selected ? 700 : 400 }}>
        {title}
      </p>
    </div>
  );
};

export default CategoryCard;