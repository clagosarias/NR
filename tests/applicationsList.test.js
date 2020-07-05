/*
  Had to declare fetch as a global variable for the tests
  due to the fact that I use HTML5 fetch in the constructor of ApplicationsList
*/
global.fetch = require("node-fetch");

import ApplicationsList from '../public/scripts/applicationsList.js';
let applicationsList;

test('Generating hostsMap from a populated json', async () => {
  applicationsList = await new ApplicationsList();
  expect(applicationsList.hostsMap.size).toBeGreaterThan(1);
})

test('Getting topAppsByHost with more than 5 apps', () => {
  expect(applicationsList.hostsMap.get("92116865-5462.conor.com").applications.length).toEqual(5);
})

test('Getting topAppsByHost with more than 25 apps', () => {
  expect(applicationsList.getTopAppsByHost("92116865-5462.conor.com").length).toEqual(25);
})

test('Add app to hosts while mainting apdex order', () => {
    let hosts = ["7e6272f7-098e.dakota.biz","9a450527-cdd9.kareem.info","e7bf58af-f0be.dallas.biz"];
    let appToBeAdded = {"name":"Small Amazing Server - Weikersheim - Boyer, and Sons","contributors":["Edwin Reinger","Ofelia Dickens","Hilbert Cole","Helen Kuphal","Maurine McDermott Sr."],"version":7,"apdex":50,"host": hosts};

    applicationsList.addAppToHosts(appToBeAdded);

    hosts.forEach(host => {
      expect(applicationsList.hostsMap.get(host).allApplications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: appToBeAdded.name
          })
        ])
      )
    })
})

test('Remove app from hosts', () => {
  let hosts = ["7e6272f7-098e.dakota.biz","9a450527-cdd9.kareem.info","e7bf58af-f0be.dallas.biz"];
  let appToBeRemoved = {"name":"Small Amazing Server - Weikersheim - Boyer, and Sons","contributors":["Edwin Reinger","Ofelia Dickens","Hilbert Cole","Helen Kuphal","Maurine McDermott Sr."],"version":7,"apdex":50,"host": hosts};

  applicationsList.removeAppFromHosts(appToBeRemoved);

  hosts.forEach(host => {
    expect(applicationsList.hostsMap.get(host).allApplications).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: appToBeRemoved.name
        })
      ])
    )
  })
})

test('Adding app with host that did not exist before', () => {
  let hosts = ["00111100-00110011.clagos.dev"];
  let appToBeAdded = {"name":"Small Amazing Server - Weikersheim - Boyer, and Sons","contributors":["Edwin Reinger","Ofelia Dickens","Hilbert Cole","Helen Kuphal","Maurine McDermott Sr."],"version":7,"apdex":50,"host": hosts};

  applicationsList.addAppToHosts(appToBeAdded);

  expect(applicationsList.hostsMap.get(hosts[0]).allApplications).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: appToBeAdded.name
      })
    ])
  )
})

test('Getting topAppsByHost with less than 5 apps', () => {
  expect(applicationsList.hostsMap.get("00111100-00110011.clagos.dev").applications.length).toEqual(1);
})

test('Getting topAppsByHost with less than 25 apps', () => {
  expect(applicationsList.getTopAppsByHost("00111100-00110011.clagos.dev").length).toEqual(1);
})