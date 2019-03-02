import React, { useContext } from 'react';

import { FileInput } from 'components/Input';
import { ReceiptContext } from 'contexts/ReceiptData';
import { ActionType } from 'hooks/useReceiptData';

export const AttachmentsInputs = () => {
  const { state, dispatch } = useContext(ReceiptContext);

  const removeFile = (index: number) => {
    const attachments = state.attachments.filter((_, i) => i !== index);
    dispatch({
      type: ActionType.CHANGE,
      data: { attachments },
    });
  };

  const handleFileChange = (file: File) => {
    const attachments = [...state.attachments, file];
    dispatch({
      type: ActionType.CHANGE,
      data: { attachments },
    });
  };

  const length = state.attachments && state.attachments.length;
  const count = length === 0 ? '' : length + 1;

  return (
    <>
      {length &&
        state.attachments.map((attachment, i) => (
          <FileInput
            key={`Vedlegg ${i + 1}`}
            label={`Vedlegg ${i + 1}`}
            onUpload={handleFileChange}
            onRemove={() => removeFile(i)}
            file={attachment || undefined}
          />
        ))}
      <FileInput label={`Vedlegg ${count}`} onUpload={handleFileChange} />
    </>
  );
};
