import { IonContent, IonPage } from "@ionic/react";
import {
  carSportOutline,
  flaskOutline,
  resizeOutline,
  scaleOutline,
  thermometerOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";

import AdModal from "../components/AdModal";
import { AdService } from "../services/AdService";
import CategoryCard from "../components/CategoryCard";
import { ConversionCategory } from "../types";
import ConverterCard from "../components/ConverterCard";

const HomeTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ConversionCategory | null>(null);
  const [showAdModal, setShowAdModal] = useState(false);
  const [modalType, setModalType] = useState<'rewarded' | 'success'>('rewarded');

  useEffect(() => {
    AdService.getInstance().setOnRewardCallback(() => {
      setModalType('success');
      setShowAdModal(true);
    });
    AdService.getInstance().setOnShowRewardedCallback(() => {
      setModalType('rewarded');
      setShowAdModal(true);
    });
  }, []);

  const categories: { key: ConversionCategory; title: string; icon: string; color: string }[] = [
    { key: "comprimento", title: "Comprimento", icon: resizeOutline, color: "#e9e7fd" },
    { key: "massa", title: "Massa", icon: scaleOutline, color: "#e6f4ea" },
    { key: "volume", title: "Volume", icon: flaskOutline, color: "#e6f0fb" },
    { key: "temperatura", title: "Temperatura", icon: thermometerOutline, color: "#fff1e6" },
    { key: "velocidade", title: "Velocidade", icon: carSportOutline, color: "#ffcccc" },
  ];

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1 style={{ fontWeight: 700 }}>Conversor</h1>
        <p style={{ color: "#777" }}>Converta unidades de forma rápida e fácil</p>

        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 10 }}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.key}
              title={cat.title}
              icon={cat.icon}
              color={cat.color}
              selected={selectedCategory === cat.key}
              onClick={() => setSelectedCategory(cat.key)}
            />
          ))}
        </div>

        <ConverterCard category={selectedCategory} />
        <AdModal isOpen={showAdModal} onClose={() => setShowAdModal(false)} type={modalType} />
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
