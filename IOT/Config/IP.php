<?php 
	$command="/sbin/ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'";
	$localIP = exec ($command);

	$Internal_IP   = $localIP;
	$Internal_PORT = "3002";
	$External_IP   = "149.3.111.194";
	$External_PORT = "4002";
?>