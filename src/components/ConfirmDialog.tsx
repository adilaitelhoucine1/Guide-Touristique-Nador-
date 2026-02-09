import './ConfirmDialog.css';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogProps) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-overlay" onClick={onCancel}>
            <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="confirm-actions">
                    <button onClick={onCancel} className="btn-cancel-dialog">Annuler</button>
                    <button onClick={onConfirm} className="btn-confirm-dialog">Confirmer</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
