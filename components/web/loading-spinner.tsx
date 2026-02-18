export default function LoadingSpinner({ message = "Loading…" }: { message?: string }) {
    return (
        <div className="flex items-center justify-center py-32">
            <div className="text-center space-y-3">
                <div className="w-10 h-10 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground">{message}</p>
            </div>
        </div>
    );
}
