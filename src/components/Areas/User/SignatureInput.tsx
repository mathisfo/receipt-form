import React, { FC, useContext, useEffect } from 'react';

import { Edit } from 'components/Icons/Edit';
import { Save } from 'components/Icons/Save';
import { FileInput } from 'components/Input';
import { ReceiptContext } from 'contexts/ReceiptData';
import { useInteraction } from 'hooks/useInteraction';
import { ActionType } from 'hooks/useReceiptData';
import { useValidation } from 'hooks/useValidation';
import { readDataUrlAsFile } from 'utils/readDataUrlAsFile';
import { readFileAsDataUrl } from 'utils/readFileAsDataUrl';

export interface IProps {
  editClick: () => void;
}

export const SignatureInput: FC<IProps> = ({ editClick }) => {
  const { state, dispatch } = useContext(ReceiptContext);

  const removeFile = () => {
    dispatch({
      type: ActionType.CHANGE,
      data: {
        signature: null,
      },
    });
  };

  const handleFileChange = (file: File) => {
    dispatch({
      type: ActionType.CHANGE,
      data: {
        signature: file,
      },
    });
  };

  const saveSignature = async () => {
    if (state.signature) {
      const signatureData = await readFileAsDataUrl(state.signature);
      localStorage.setItem('SAVED_SIGNATURE', signatureData);
    }
  };

  const restoreSignature = async () => {
    const savedSignatureData = localStorage.getItem('SAVED_SIGNATURE');
    if (!state.signature && savedSignatureData) {
      const savedSignature = await readDataUrlAsFile(savedSignatureData);
      if (savedSignature) {
        handleFileChange(savedSignature);
      }
    }
  };

  useEffect(() => {
    restoreSignature();
  }, []);

  const { validation, level } = useValidation('signature');
  const { interacted, setInteracted } = useInteraction('signature');

  return (
    <FileInput
      label="Signatur"
      onUpload={handleFileChange}
      onRemove={removeFile}
      file={state.signature || undefined}
      validation={validation}
      validationLevel={level}
      buttons={
        <>
          <Edit onClick={editClick} title="Tegn signatur" />
          {!!state.signature ? <Save onClick={saveSignature} title="Lagre signaturen i nettleseren" /> : null}
        </>
      }
      placeholder="Trykk på pennen for å skrive inn signatur. Klikk på dette feltet, eller dra en fil hit for å laste opp"
      interacted={interacted}
      onBlur={setInteracted}
      allowedTypes={['image/png']}
    />
  );
};
