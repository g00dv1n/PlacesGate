/**
 * Created by g00dv1n on 08.09.16.
 */


class EnvGenerator {
    static getEnvRegExps () {
        let vars = {

            //programs:`${windrive}\\Users\\${username}\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs`,
            //startup: `${windrive}\\Users\\${username}\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup`,
            '%startup%' :/.:\\Users\\.*\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup/i,
            '%programs%':/.:\\Users\\.*\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs/i,
            '%commonstartup%': /.:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp/i,
            '%commonprograms%': /.:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs/i,
            '%commonstartmenu%': /.:\\ProgramData\\Microsoft\\Windows\\Start Menu/i,
            '%startmenu%': /.:\\Users\\.*\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu/i,
            '%appdata%' :/.:\\Users\\.*\\AppData\\Roaming/i,
            '%temp%': /.:\\Users\\.*\\AppData\\Local\\Temp/i,
            '%mydoc%' : /.:\\Users\\.*\\Documents/i,
            '%desktop%': /.:\\Users\\.*\\Desktop/i,
            '%chromeprofile%': /.:\\Users\\.*\\AppData\\Local\\Google\\Chrome\\User Data\\Default/i,
            '%commonappdata%': /.:\\ProgramData/i,
            '%commondesktopdir%': /.:\\Users\\Public\\Desktop/i,
            '%commondir%': /.:\\Program Files\\Common Files/i,
            '%favorites%': /.:\\Users\\.*\\Favorites/g,
            '%localappdata%': /.:\\Users\\.*\\AppData\\LocalLow/i,
            '%local%': /.:\\Users\\.*\\AppData\\Local/i,
            '%programfiles%': /.:\\Program Files/i,
            '%tasks%': /.:\\Windows\\System32\\Tasks/i,
            '%systemdir%': /.:\\Windows\\System32/i,
            '%windir%': /.:\\Windows/i


            /*mydoc: `${windrive}\\Users\\${username}\\Documents`,
            desktop: `${windrive}\\Users\\${username}\\Desktop`,
            appdata: `${windrive}\\Users\\${username}\\AppData\\Roaming`,
            localappdata: `${windrive}\\Users\\${username}\\AppData\\Local`,
            local: `${windrive}\\${username}\\AppData\\Local`,
            favorites: `${windrive}\\Users\\${username}\\Favorites`,
            temp: `${windrive}\\Users\\${username}\\AppData\\Local\\Temp`,
            localappdatalow: `${windrive}\\Users\\${username}\\AppData\\LocalLow`,
            userprofile: `${windrive}\\Users\\${username}`,

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
            sysdirve: `${windrive}`*/
        };
        return vars;
    }

}

module.exports = EnvGenerator;