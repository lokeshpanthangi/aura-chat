import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, Settings, ArrowRight } from 'lucide-react';
import { ChatMode } from '@/types/chat';

interface ModeSelectionDialogProps {
  open: boolean;
  onSelect: (mode: ChatMode, employeeId?: string) => void;
}

export function ModeSelectionDialog({ open, onSelect }: ModeSelectionDialogProps) {
  const [step, setStep] = useState<'select' | 'employeeId'>('select');
  const [employeeId, setEmployeeId] = useState('');

  const handleModeSelect = (mode: ChatMode) => {
    if (mode === 'manual') {
      setStep('employeeId');
    } else {
      onSelect('full');
      resetDialog();
    }
  };

  const handleEmployeeSubmit = () => {
    if (employeeId.trim()) {
      onSelect('manual', employeeId.trim());
      resetDialog();
    }
  };

  const resetDialog = () => {
    setStep('select');
    setEmployeeId('');
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        {step === 'select' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl text-center">Choose Your Mode</DialogTitle>
              <DialogDescription className="text-center">
                Select how you'd like to interact with the assistant
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <button
                onClick={() => handleModeSelect('full')}
                className="group flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/50 transition-all duration-200"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-foreground">Full Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatic assistance with full capabilities
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>

              <button
                onClick={() => handleModeSelect('manual')}
                className="group flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/50 transition-all duration-200"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Settings className="h-6 w-6" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-foreground">Manual Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Requires Employee ID for personalized access
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl text-center">Enter Employee ID</DialogTitle>
              <DialogDescription className="text-center">
                Please provide your Employee ID to continue in Manual Mode
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  placeholder="e.g., EMP001"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEmployeeSubmit()}
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep('select')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleEmployeeSubmit}
                  disabled={!employeeId.trim()}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
