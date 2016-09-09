/**
 * Created by g00dv1n on 08.09.16.
 */


class EnvGenerator {
    static getEnvVars (username, windrive) {
        let vars = {
            mydoc: `${windrive}\\${username}\\Documents`,
            programfiles: `${windrive}\\Program Files`,
            systemdir: `${windrive}\\Windows\\System32`,
            commondir: `${windrive}\\Program Files\\Common Files`,
            windir:  `${windrive}\\Windows`,
            appdata: `${windrive}\\${username}\\AppData\\Roaming`,
            desktop: `${windrive}\\${username}\\Desktop`,
            favorites: `${windrive}\\${username}\\Favorites`,
            tempdir: `${windrive}\\${username}\\AppData\\Local\\Temp`,
            sysdirve: `${windrive}`,
            userprofile: `${windrive}\\${username}`,
            localappdatalow: `${windrive}\\${username}\\AppData\\LocalLow`,
            commonappdata: `${windrive}\\ProgramData`,
            alluserprofile: `${windrive}\\ProgramData`,
            commonprograms: `${windrive}\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs`,
            desktopdir: `${windrive}\\${username}\\Desktop`,
            commondesktopdir: `${windrive}\\Public\\Desktop`,
            commonstartmenu: `${windrive}\\ProgramData\\Microsoft\\Windows\\Start Menu`,
            commonfavorites: `${windrive}\\${username}\\Favorites`,
            localappdata: `${windrive}\\${username}\\AppData\\Local`,
            local: `${windrive}\\${username}\\AppData\\Local`,
            commondoc: `${windrive}\\Users\\Public\\Documents`,
            programs:`${windrive}\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs`,
            startup: `${windrive}\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup`,
            cookies: `${windrive}\\AppData\\Roaming\\Microsoft\\Windows\\Cookies`,
            history: `${windrive}\\AppData\\Roaming\\Microsoft\\Windows\\History`,
            commonstartup: `${windrive}\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Startup`,
            startmenu: `${windrive}\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu`
        };
        return vars;
    }

}

module.exports = EnvGenerator;