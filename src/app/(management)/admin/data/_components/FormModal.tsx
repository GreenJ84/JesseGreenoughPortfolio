import css from './DataPage.module.css';

export interface FormModalProps {
  title: String;
  onClose: () => void;
  children?: React.ElementType<any, any>;
}

export default function FormModal({
  title,
  onClose,
  children
}: FormModalProps) {

  return (<>
    <div className={css.modalBackdrop} onClick={onClose} />
    <div className={css.formContainer}>
      <h2 className={css.formTitle}>{title}</h2>
      <button
        type="button"
        className={css.closeBtn}
        onClick={onClose}
        aria-label="Close form"
      >
        ✕
      </button>
      {children}
    </div>
  </>);
}


// ===================
interface FormActionButtonsProps {
  id?: string,
  onClose: () => void,
  onDelete?: (id: string) => void
}
export function FormActionButtons({
  id,
  onClose,
  onDelete
}: FormActionButtonsProps) {

  return (
    <div className={css.modalActions}>
      <button type="submit" className={css.submitBtn}>{id ? "Save" : "Create"}</button>
      {id && (
        <button
          type="button"
          className={css.deleteBtn}
          onClick={() => {
            console.log('Delete triggered for id:', id);
            onDelete?.(id);
            onClose();
          }}
        >
          Delete
        </button>
      )}
      <button type="button" className={css.cancelBtn} onClick={onClose}>Cancel</button>
    </div>
  )
}