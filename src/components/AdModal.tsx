import { IonButton, IonContent, IonModal, IonText } from '@ionic/react';

import { AdService } from '../services/AdService';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'rewarded' | 'success';
}

const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, type }) => {
  const handleWatchAd = async () => {
    onClose();
    AdService.getInstance().showRewardedAd();
  };

  const handleSimulateReward = () => {
    AdService.getInstance().grantReward();
    onClose();
  };

  const handleSuccessClose = () => {
    onClose();
  };

  if (type === 'success') {
    return (
      <IonModal isOpen={isOpen} onDidDismiss={onClose}>
        <IonContent className="ion-padding">
          <IonText>
            <h2>Parabéns!</h2>
            <p>Você ganhou 60 minutos de aplicativo sem propaganda!</p>
          </IonText>
          <IonButton expand="full" onClick={handleSuccessClose}>OK</IonButton>
        </IonContent>
      </IonModal>
    );
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Assista um vídeo para desativar anúncios</h2>
          <p>Ganhe 60 minutos sem anúncios assistindo este vídeo curto.</p>
        </IonText>
        <IonButton expand="full" onClick={handleWatchAd}>Assistir Vídeo</IonButton>
        <IonButton expand="full" fill="outline" onClick={handleSimulateReward}>Simular Recompensa (Teste)</IonButton>
        <IonButton expand="full" fill="outline" onClick={onClose}>Depois</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default AdModal;