// Empty State Component
export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
      {Icon && (
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
          <Icon className="w-8 h-8 text-slate-400" />
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}
