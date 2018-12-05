package com.jio.dealer.manager;

import java.io.FileInputStream;
import java.util.Properties;

import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ContextHandlerCollection;
import org.eclipse.jetty.server.handler.DefaultHandler;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.server.nio.SelectChannelConnector;

public class RTJioDealerManagerServerClass {
		
	public static void main(String[] args) throws Exception {

		try {

			final ContextHandlerCollection context = new ContextHandlerCollection();
			Server server = new Server();
			Connector connector = new SelectChannelConnector();
			Properties pr = new Properties();
			pr.load(new FileInputStream("../configuration/server.properties"));
			connector.setHost(pr.getProperty("host"));
			connector.setPort(Integer.parseInt(pr.getProperty("port")));
			server.setConnectors(new Connector[] { connector });

			ResourceHandler resHandler = new ResourceHandler();
			resHandler.setDirectoriesListed(true);
			resHandler.setResourceBase(pr.getProperty("uiPath"));
			resHandler.setWelcomeFiles(new String[] { "index.html" });

			HandlerCollection handlerCollection = new HandlerCollection();
			handlerCollection.setHandlers(new Handler[] { resHandler, context, new DefaultHandler() });
			server.setHandler(handlerCollection);

			server.start();

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
