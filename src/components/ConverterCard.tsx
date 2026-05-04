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

  // Calculate conversions when the selected input value changes
  useEffect(() => {
    if (!category || !lastChangedUnit) return;

    const currentValue = values[lastChangedUnit] ?? "";
    const inputValue = parseFloat(currentValue.replace(',', '.') || '0');
    if (isNaN(inputValue)) return;

    const newValues: Record<string, string> = {};
    let hasNonZero = false;

    units.forEach(unit => {
      if (unit.symbol === lastChangedUnit) {
        newValues[unit.symbol] = currentValue;
      } else {
        const converted = convert(category, inputValue, lastChangedUnit, unit.symbol);
        newValues[unit.symbol] = formatResult(converted);
        if (converted !== 0) hasNonZero = true;
      }
    });

    const valuesAreEqual = units.every(unit => newValues[unit.symbol] === values[unit.symbol]);
    if (!valuesAreEqual) {
      setValues(newValues);
    }
  }, [category, lastChangedUnit, values[lastChangedUnit], units]);

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
    velocidade: "Velocidade"
  };

  return (
    <IonCard style={{ borderRadius: 20, marginTop: 20 }}>
      <IonCardContent>
        <h2 style={{ margin: "0 0 8px 0" }}>{categoryTitles[category]}</h2>
        <p style={{ color: "#777", marginBottom: 16 }}>
          Converter unidades de {categoryTitles[category].toLowerCase()}
        </p>

        {units.map((unit) => (
          <IonItem key={unit.symbol} style={{ borderRadius: 12, marginBottom: 8 }}>
            <IonLabel slot="start" style={{ minWidth: 80 }}>
              <span style={{ fontSize: 20 }}>{unit.icon}</span>
              <span style={{ marginLeft: 8, fontSize: 14 }}>{unit.symbol}</span>
            </IonLabel>
            <IonInput
              slot="end"
              
              value={values[unit.symbol] || ""}
              placeholder="0"
              onIonChange={(e) => handleValueChange(unit.symbol, e.detail.value || "")}
              style={{ textAlign: "right", color: "#f9d71c" }}
            />
          </IonItem>
        ))}

        
      </IonCardContent>
    </IonCard>
  );
};

export default ConverterCard;