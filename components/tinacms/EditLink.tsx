export function EditLink(props) {

    const {cms} = props

    return(
        <div className="py-20 mt-48">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                <div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3 text-white">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1 flex items-center">
                            <p className="ml-3 font-medium text-white truncate">
                                <span>
                                    {cms.enabled ? 'Click the button to logout' : 'Click the button to Login and edit the site'}
                                </span>
                            </p>
                        </div>
                        <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                            <button onClick={() => cms.toggle()} className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">
                                {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}