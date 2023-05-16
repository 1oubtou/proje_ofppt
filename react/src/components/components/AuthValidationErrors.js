const AuthValidationErrors = ({ errors = [], ...props }) => (
  <>
    {errors.length > 0 && (
      <div {...props} className="text-center bg-red-100 rounded-md mb-3 py-2">
        <div className="font-medium text-red-600">
          Whoops! Something went wrong.
        </div>
        <ul className="mt-2 text-sm text-red-600">
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    )}
  </>
)

export default AuthValidationErrors
