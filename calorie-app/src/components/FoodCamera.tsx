import React, {
  useRef,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera';

import { useTheme } from '../contexts/ThemeContext';

type Props = {
  visible: boolean;
  onClose: () => void;
  onPhotoTaken: (uri: string) => void;
};

export default function FoodCamera({
  visible,
  onClose,
  onPhotoTaken,
}: Props) {
  const { colors } =
    useTheme();

  const cameraRef =
    useRef<CameraView>(null);

  const [
    permission,
    requestPermission,
  ] = useCameraPermissions();

  const [cameraReady, setCameraReady] =
    useState(false);

  const takePhoto = async () => {
    if (
      !cameraRef.current ||
      !cameraReady
    ) {
      return;
    }

    try {
      const photo =
        await cameraRef.current.takePictureAsync(
          {
            quality: 0.8,
          }
        );

      if (photo?.uri) {
        onPhotoTaken(photo.uri);
      }
    } catch (error) {
      console.log(
        'Error tomando foto:',
        error
      );
    }
  };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View
          style={
            styles.permissionOverlay
          }
        >
          <View
            style={[
              styles.permissionCard,
              {
                backgroundColor:
                  colors.card,
              },
            ]}
          >
            <Text
              style={
                styles.permissionIcon
              }
            >
              📷
            </Text>

            <Text
              style={[
                styles.permissionTitle,
                {
                  color:
                    colors.text,
                },
              ]}
            >
              Necesitamos tu cámara
            </Text>

            <Text
              style={[
                styles.permissionText,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              Usaremos la cámara para
              tomar fotografías de tus
              comidas.
            </Text>

            <TouchableOpacity
              style={[
                styles.permissionButton,
                {
                  backgroundColor:
                    colors.primary,
                },
              ]}
              onPress={
                requestPermission
              }
            >
              <Text
                style={
                  styles.permissionButtonText
                }
              >
                Permitir cámara
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
            >
              <Text
                style={[
                  styles.cancelText,
                  {
                    color:
                      colors.secondaryText,
                  },
                ]}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View
        style={
          styles.cameraContainer
        }
      >
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
          onCameraReady={() =>
            setCameraReady(true)
          }
        >
          <View
            style={
              styles.cameraHeader
            }
          >
            <TouchableOpacity
              style={
                styles.closeButton
              }
              onPress={onClose}
            >
              <Text
                style={
                  styles.closeText
                }
              >
                ×
              </Text>
            </TouchableOpacity>

            <Text
              style={
                styles.cameraTitle
              }
            >
              Tomar foto
            </Text>

            <View
              style={
                styles.headerSpace
              }
            />
          </View>

          <View
            style={
              styles.guideContainer
            }
          >
            <View
              style={[
                styles.corner,
                styles.cornerTopLeft,
              ]}
            />

            <View
              style={[
                styles.corner,
                styles.cornerTopRight,
              ]}
            />

            <View
              style={[
                styles.corner,
                styles.cornerBottomLeft,
              ]}
            />

            <View
              style={[
                styles.corner,
                styles.cornerBottomRight,
              ]}
            />

            <Text
              style={
                styles.guideText
              }
            >
              Coloca tu comida dentro
              del recuadro
            </Text>
          </View>

          <View
            style={
              styles.cameraControls
            }
          >
            <TouchableOpacity
              style={[
                styles.captureOuter,
                {
                  opacity:
                    cameraReady
                      ? 1
                      : 0.5,
                },
              ]}
              disabled={
                !cameraReady
              }
              onPress={
                takePhoto
              }
            >
              <View
                style={
                  styles.captureInner
                }
              />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },

  camera: {
    flex: 1,
  },

  cameraHeader: {
    paddingTop: 55,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
  },

  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor:
      'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '300',
    marginTop: -4,
  },

  cameraTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },

  headerSpace: {
    width: 44,
  },

  guideContainer: {
    position: 'absolute',
    left: 35,
    right: 35,
    top: '30%',
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },

  corner: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderColor: '#FFF',
  },

  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },

  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },

  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },

  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },

  guideText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor:
      'rgba(0,0,0,0.45)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    textAlign: 'center',
  },

  cameraControls: {
    position: 'absolute',
    bottom: 55,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  captureOuter: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 5,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  captureInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#FFF',
  },

  permissionOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  permissionCard: {
    width: '100%',
    borderRadius: 24,
    padding: 25,
    alignItems: 'center',
  },

  permissionIcon: {
    fontSize: 48,
    marginBottom: 15,
  },

  permissionTitle: {
    fontSize: 21,
    fontWeight: '800',
    textAlign: 'center',
  },

  permissionText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 22,
  },

  permissionButton: {
    width: '100%',
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  permissionButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },

  cancelText: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 18,
  },
});