import { Button, Modal } from "@heroui/react";
import { Trash2, X, AlertTriangle } from "lucide-react";

const DeletePatient = () => {
  return (
    <Modal>
      <Button
        isIconOnly
        variant="secondary"
        aria-label="Delete Doctor"
        className="flex h-8 w-8 min-w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-all duration-200 hover:scale-105 hover:bg-red-100 hover:shadow-md"
      >
        <Trash2 size={15} />
      </Button>

      <Modal.Backdrop className="bg-slate-950/60 backdrop-blur-sm">
        <Modal.Container placement="center" className="p-3">
          <Modal.Dialog className="w-full max-w-[400px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <Modal.Header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <AlertTriangle size={22} />
                </div>

                <div>
                  <Modal.Heading className="text-base font-bold text-slate-800">
                    Delete Confirmation
                  </Modal.Heading>
                  <p className="mt-1 text-xs text-slate-400">
                    This action requires confirmation
                  </p>
                </div>
              </div>

              <Modal.CloseTrigger className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-all hover:scale-105 hover:bg-red-100 hover:text-red-600">
                <X size={17} />
              </Modal.CloseTrigger>
            </Modal.Header>

            <Modal.Body className="px-5 py-4">
              <p className="text-sm text-slate-600">
                Are you sure you want to delete this doctor? This action cannot
                be undone.
              </p>
            </Modal.Body>

            <Modal.Footer className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4">
              <Button
                slot="close"
                variant="secondary"
                className="rounded-lg px-5 font-medium text-slate-600"
              >
                Cancel
              </Button>

              <Button
               
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 font-semibold text-white shadow-md shadow-red-600/20 transition-all hover:bg-red-700 active:scale-95"
              >
                <Trash2 size={15} />
                Delete
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default DeletePatient;