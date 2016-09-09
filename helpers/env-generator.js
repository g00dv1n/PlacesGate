/**
 * Created by g00dv1n on 08.09.16.
 */


class EnvGenerator {
    static getEnvVars (username, windrive) {
        let vars = {
            mydoc: `${windrive}\\${username}\\Documents`,
            desktop: `${windrive}\\${username}\\Desktop`,
            appdata: `${windrive}\\${username}\\AppData\\Roaming`,
            desktopdir: `${windrive}\\${username}\\Desktop`,
            localappdata: `${windrive}\\${username}\\AppData\\Local`,
            local: `${windrive}\\${username}\\AppData\\Local`,
            favorites: `${windrive}\\${username}\\Favorites`,
            tempdir: `${windrive}\\${username}\\AppData\\Local\\Temp`,
            localappdatalow: `${windrive}\\${username}\\AppData\\LocalLow`,
            commonfavorites: `${windrive}\\${username}\\Favorites`,
            userprofile: `${windrive}\\${username}`,
            programs:`${windrive}\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs`,
            startup: `${windrive}\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup`,
            commonstartup: `${windrive}\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Startup`,
            startmenu: `${windrive}\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu`,
            commonprograms: `${windrive}\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs`,
            commonstartmenu: `${windrive}\\ProgramData\\Microsoft\\Windows\\Start Menu`,
            cookies: `${windrive}\\AppData\\Roaming\\Microsoft\\Windows\\Cookies`,
            history: `${windrive}\\AppData\\Roaming\\Microsoft\\Windows\\History`,
            commondir: `${windrive}\\Program Files\\Common Files`,
            commondoc: `${windrive}\\Users\\Public\\Documents`,
            commondesktopdir: `${windrive}\\Public\\Desktop`,
            programfiles: `${windrive}\\Program Files`,
            systemdir: `${windrive}\\Windows\\System32`,
            commonappdata: `${windrive}\\ProgramData`,
            alluserprofile: `${windrive}\\ProgramData`,
            windir:  `${windrive}\\Windows`,
            sysdirve: `${windrive}`
        };
        return vars;
    }

}

module.exports = EnvGenerator;