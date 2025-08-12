import {useEffect, useRef, useState, useCallback} from 'react';
import {useFaceDetector} from '@react-native-ml-kit/face-detection';
import {useCameraDevice, useCameraPermission} from 'react-native-vision-camera';
import {Alert} from 'react-native';

export const useFaceRecognition = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [faces, setFaces] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  const device = useCameraDevice('front');
  const {hasPermission: cameraPermission, requestPermission} =
    useCameraPermission();

  const faceDetector = useFaceDetector({
    performanceMode: 'fast',
    landmarkMode: 'all',
    contourMode: 'all',
    classificationMode: 'all',
  });

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const permission = await requestPermission();
    setHasPermission(permission);
  };

  const detectFaces = useCallback(
    async frame => {
      if (!faceDetector || !isDetecting) return;

      try {
        const detectedFaces = await faceDetector.process(frame);
        setFaces(detectedFaces);

        // Auto-capture when face is detected and stable
        if (
          detectedFaces.length === 1 &&
          detectedFaces[0].smilingProbability > 0.7
        ) {
          await captureFace();
        }
      } catch (error) {
        console.error('Face detection error:', error);
      }
    },
    [faceDetector, isDetecting],
  );

  const captureFace = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'balanced',
        flash: 'off',
        enableAutoStabilization: true,
      });

      setCapturedImage(photo.path);
      return photo.path;
    } catch (error) {
      console.error('Capture error:', error);
      Alert.alert('Error', 'Failed to capture face');
    }
  };

  const startDetection = () => {
    setIsDetecting(true);
  };

  const stopDetection = () => {
    setIsDetecting(false);
  };

  return {
    cameraRef,
    device,
    hasPermission: cameraPermission && hasPermission,
    faces,
    isDetecting,
    capturedImage,
    detectFaces,
    captureFace,
    startDetection,
    stopDetection,
  };
};
