import { Map } from '../../Auth/_interfaces';

export interface SettingsMenuProps {
  closeSettingsMenu: () => void;
  settingsMenuOpen: boolean;
  handleClick: (type: SettingsModal) => void;
  handleReset: () => void;
}

export interface SaveFormProps {
  closeModal: () => void;
}

export interface LoadFormProps {
  maps: Map[];
  shouldDelete: boolean;
  loadMap: (map: Map) => void;
}

export interface MapListItemProps {
  name: string;
  loadMap: () => void;
  deleteMap?: () => void;
  isActive: boolean;
  size: number;
}

export interface SettingsProps {
  closeSettingsMenu: () => void;
  settingsMenuOpen: boolean;
  openSettingsMenu: () => void;
  closeCategoryMenu: () => void;
}

export interface ConfirmModalProps {
  message: string;
  confirmButton: string;
  onCancel: () => void;
  onConfirmation: () => void;
}

export type SettingsModal = 'load' | 'save' | 'new' | 'choose' | 'random';
