set rtSDPRSPJAR=.\SystemAdmin.jar

set PORT="9998"

if exist "%rtSDPRSPJAR%" goto rtSDPRSPJAR

echo Could not locate SDP PCRF server JAR FILE. MAKE SURE YOU EXECUTE THIS SCRIPT FROM THE DIRECTORY OF THE JAR FILE

GOTO END

:rtSDPRSPJAR

set JAVA=%JAVA_HOME%\bin\java

set JAVAC_JAR=%JAVA_HOME%\lib\tools.jar

"%JAVA%" -server -version 2>&1 | findstr /I hotspot > nul

if not errorlevel == 1 (set JAVA_OPTS=%JAVA_OPTS% -server)

set JAVA_OPTS=%JAVA_OPTS% -Xms512m -Xmx512m -Dsun.rmi.dgc.client.gcInterval=3600000 -Dsun.rmi.dgc.server.gcInterval=3600000 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.port=%PORT%

if not "%JAVAC_JAR%" == "" set IMSASJAR=%JAVAC_JAR%;%rtSDPRSPJAR%

set RUN_CLASSPATH=%rtSDPRSPJAR%;..\lib\*

if "%RUN_CLASSPATH%" == "" set RUN_CLASSPATH=%rtSDPRSPJAR%;..\lib\*

set AS_CLASSPATH=%RUN_CLASSPATH%

"%JAVA%" %JAVA_OPTS% ^

-classpath "%AS_CLASSPATH%" ^

com.jio.system.manager.RTJioServerClass%*

:END