import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Check } from 'components/Icons/Check';
import { Cross } from 'components/Icons/Cross';
import { Edit } from 'components/Icons/Edit';
import { Undo } from 'components/Icons/Undo';
import { BaseInputStyle, InputContainer } from 'components/Input';
import { FileLabels } from 'components/Input/FileLabels';
import { colors } from 'constants/colors';
import { readDataUrlAsFile } from 'utils/readDataUrlAsFile';
import { SignaturePadReforged as SignaturePad } from 'utils/SignatureReforged';

const Canvas = styled.canvas`
  ${BaseInputStyle}
  padding: 0;
  min-height: 8rem;
`;

export interface IProps {
  saveClick: (image: File) => void;
  editClick: () => void;
}

export const Signature: FC<IProps> = ({ saveClick, editClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signaturePad, setSignaturePad] = useState<SignaturePad | null>(null);
  const resizeCanvas = () => {
    if (canvasRef.current && signaturePad) {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvasRef.current.width = canvasRef.current.offsetWidth * ratio;
      canvasRef.current.height = canvasRef.current.offsetHeight * ratio;
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.scale(ratio, ratio);
      }
      signaturePad.clear();
    }
  };

  const createSignaturePad = () => {
    if (canvasRef.current) {
      setSignaturePad(new SignaturePad(canvasRef.current, { backgroundColor: colors.white, enableTouchpad: true }));
    }
  };

  const clear = () => {
    if (signaturePad) {
      signaturePad.clear();
    }
  };

  const undo = () => {
    if (signaturePad) {
      const data = signaturePad.toData();
      if (data) {
        data.pop();
        signaturePad.fromData(data);
      }
    }
  };

  const save = async () => {
    if (signaturePad) {
      const imageURL = signaturePad.toDataURL('image/png');
      const image = await readDataUrlAsFile(imageURL);
      if (image) {
        saveClick(image);
      }
      editClick();
    }
  };

  const observeTouch = () => {
    if (canvasRef.current) {
      console.log(Object.keys(canvasRef.current));
      canvasRef.current.requestPointerLock();
    }
  };

  useEffect(() => {
    createSignaturePad();
  }, [canvasRef.current, canvasRef]);

  useEffect(() => {
    resizeCanvas();
  }, [signaturePad]);

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [canvasRef.current, canvasRef, signaturePad]);

  return (
    <InputContainer>
      <FileLabels label="Signér">
        <Edit onClick={observeTouch} title="Tegn med touchpad" />
        <Check onClick={save} title="Lagre signatur" />
        <Undo onClick={undo} title="Fjern siste linje" />
        <Cross onClick={clear} title="Start signeringen på nytt" />
        <Edit onClick={editClick} title="Avslutt uten å lagre" />
      </FileLabels>
      <Canvas ref={canvasRef} />
    </InputContainer>
  );
};
