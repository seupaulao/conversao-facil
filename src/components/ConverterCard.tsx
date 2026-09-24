import { ConversionCategory, UNITS, convert, formatResult } from "../types";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel
} from "@ionic/react";
import { useEffect, useState } from "react";

import { AdService } from "../services/AdService";

interface ConverterCardProps {
  category: ConversionCategory | null;
}

const ConverterCard: React.FC<ConverterCardProps> = ({ category }) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [lastChangedUnit, setLastChangedUnit] = useState<string | null>(null);

  const units = category ? UNITS[category] : [];

  // Reset values when category changes
  useEffect(() => {
    setValues({});
    setLastChangedUnit(null);
  }, [category]);

  const handleValueChange = (unitSymbol: string, value: string) => {
    setValues(prev => ({ ...prev, [unitSymbol]: value }));
    setLastChangedUnit(unitSymbol);
  };

  const handleCalculate = () => {
    if (!category || !lastChangedUnit) return;

    const currentValue = values[lastChangedUnit] ?? "";
    const inputValue = parseFloat(currentValue.replace(',', '.') || '0');
    if (isNaN(inputValue)) return;

    const newValues: Record<string, string> = {};
    units.forEach(unit => {
      if (unit.symbol === lastChangedUnit) {
        newValues[unit.symbol] = currentValue;
      } else {
        const converted = convert(category, inputValue, lastChangedUnit, unit.symbol);
        newValues[unit.symbol] = formatResult(converted);
      }
    });

    setValues(newValues);
    AdService.getInstance().incrementConversion();
  };

  const handleClear = () => {
    setValues({});
    setLastChangedUnit(null);
  };

  if (!category) {
    return (
      <IonCard style={{ borderRadius: 20, marginTop: 20, background: "#f5f5f5" }}>
        <IonCardContent style={{ textAlign: "center", padding: "40px 20px" }}>
          <p style={{ color: "#888", fontSize: 16 }}>
            Selecione uma categoria acima para começar a converter
          </p>
        </IonCardContent>
      </IonCard>
    );
  }

  const categoryTitles: Record<ConversionCategory, string> = {
    comprimento: "Comprimento",
    massa: "Massa",
    volume: "Volume",
    temperatura: "Temperatura",
    velocidade: "Velocidade",
    astronomia: "Astronomia",
    'peso-coreano': "Peso Coreano",
    'volume-coreano': "Volume Coreano",
    'distancia-coreana': "Distância Coreana"
  };

  return (
    <IonCard style={{ borderRadius: 20, marginTop: 20 }}>
      <IonCardContent>
        <h2 style={{ margin: "0 0 8px 0" }}>{categoryTitles[category]}</h2>
        <p style={{ color: "#777", marginBottom: 16 }}>
          Converter unidades de {categoryTitles[category].toLowerCase()}
        </p>

        {units.map((unit) => (
          <IonItem
            key={unit.symbol}
            className="converter-item"
            style={{ alignItems: "center" }}
          >
            <IonLabel slot="start" style={{ minWidth: 80, margin: 0 }}>
              <span style={{ fontSize: 20 }}>{unit.icon}</span>
              <span style={{ marginLeft: 8, fontSize: 14 }}>{unit.symbol}</span>
            </IonLabel>
            <IonInput
              slot="end"
              value={values[unit.symbol] || ""}
              placeholder="0"
              onIonChange={(e) => handleValueChange(unit.symbol, e.detail.value || "")}
              style={{
                textAlign: "right",
                margin: 0,
                borderRadius: 8,
              }}
            />
          </IonItem>
        ))}

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 16, marginTop: 16 }}>
          <IonButton
            onClick={handleCalculate}
            color="warning"
            fill="solid"
  style={{
    "--background": "#f5c542",
    "--background-activated": "#d7ad3a",
    "--color": "#000000",
  }}
          >
            CALCULAR
          </IonButton>
          <IonButton
            onClick={handleClear}
            color="primary"
          >
            LIMPAR
          </IonButton>
        </div>

        <div id="ad-banner-bottom" style={{ height: 50, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
          {/* Banner Ad will be loaded here */}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ConverterCard;