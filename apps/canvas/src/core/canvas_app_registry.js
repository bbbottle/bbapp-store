import { CanvasApp, LivableZone, Zone } from "./canvas_app";
import { CANVAS_APPLICATIONS, EMPTY_APP_ID } from "../const";

/**
 * 画布应用注册表
 */
export class CanvasAppRegistry {
  constructor(apps = CANVAS_APPLICATIONS) {
    this._availableApps = new Map();
    this._installedApps = new Map();
    this._registerApp = this._registerApp.bind(this);
    this._registerApps(apps);
    this._activeAppSid = "";
  }

  _registerApp(appInfo) {
    const {
      id,
      name,
      icon,
      component,
      description,
      widthRange,
      heightRange,
    } = appInfo;

    const appExtras = {
      uninstall: this.uninstallApp,
      isActive: (app) => {
        return this._activeAppSid === app.sid;
      },
      active: (app) => {
        this._activeAppSid = app.sid;
      },
    };

    const app = new CanvasApp(
      id,
      name,
      icon,
      component,
      description,
      LivableZone.create(widthRange, heightRange),
      appExtras
    );

    this._availableApps.set(id, app);
  }

  _registerApps(apps) {
    apps.forEach(this._registerApp);
  }

  installApp = (symbolId, hostInfo) => {
    const app = this.availableApp(hostInfo);
    app.sid = symbolId;
    this._activeAppSid = symbolId;
    this._installedApps.set(symbolId, app);
    this._availableApps.delete(app.id);
  };

  uninstallApp = (app) => {
    this._installedApps.delete(app.sid);
    this._availableApps.set(app.id, app);
  };

  getInstalledApp = (id) => this._installedApps.get(id);

  availableApps() {
    return Array.from(this._availableApps.values());
  }

  availableApp(hostInfo = {}) {
    const { width, height } = hostInfo;
    const hostZone = new Zone(width, height);
    return (
      this.availableApps().find((app) => app.canLiveIn(hostZone)) ||
      this._availableApps.get(EMPTY_APP_ID)
    );
  }
}
