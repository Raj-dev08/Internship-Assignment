import { THEMES } from "../lib/themes";
import { useThemeStore } from "../store/useThemeStore";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10 pb-28">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold">Settings</h1>
          <p className="text-sm opacity-60 mt-2">
            Customize your app appearance
          </p>
        </div>

        {/* THEME SECTION */}
        <div className="card bg-base-100 border border-base-300 shadow-xl">
          <div className="card-body space-y-5">

            <div>
              <h2 className="text-xl font-semibold">Theme</h2>
              <p className="text-sm opacity-60">
                Choose a theme for your dashboard
              </p>
            </div>

            {/* THEMES GRID */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t as typeof theme)}
                  className={`p-3 rounded-xl border transition-all flex flex-col gap-2 items-center
                    ${
                      theme === t
                        ? "border-primary bg-base-200"
                        : "border-base-300 hover:bg-base-200/60"
                    }
                  `}
                >
                  {/* preview block */}
                  <div
                    className="w-full h-6 rounded-md overflow-hidden grid grid-cols-4 gap-px p-1"
                    data-theme={t}
                  >
                    <div className="bg-primary rounded"></div>
                    <div className="bg-secondary rounded"></div>
                    <div className="bg-accent rounded"></div>
                    <div className="bg-neutral rounded"></div>
                  </div>

                  <span className="text-xs font-medium truncate w-full text-center">
                    {t}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* INFO CARD */}
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">

            <h2 className="text-lg font-semibold">App Preferences</h2>

            <div className="text-sm opacity-70 space-y-2 mt-2">
              <p>• Theme is saved in local storage</p>
              <p>• Changes apply instantly across the app</p>
              <p>• Works with DaisyUI theme system</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;