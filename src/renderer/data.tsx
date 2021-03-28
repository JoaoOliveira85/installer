import React from "react";
import { shell } from "electron";
import { DataCache } from "renderer/utils/DataCache";
import { GitVersions } from "@flybywiresim/api-client";
import { Configuration } from "./utils/InstallerConfiguration";

import A320NoseSVG from "renderer/assets/a32nx_nose.svg";
import A380NoseSVG from "renderer/assets/a380x_nose.svg";

const RELEASE_CACHE_LIMIT = 5 * 60 * 1000;

export const defaultConfiguration: Configuration = {
    mods: [
        {
            name: 'A32NX',
            repoName: 'a32nx',
            aircraftName: 'A320neo',
            key: 'A32NX',
            enabled: true,
            menuIconUrl: A320NoseSVG,
            backgroundImageUrls: [
                'https://nyc3.digitaloceanspaces.com/fselite/2020/11/123263426_126778999193686_7966913238295950901_o.png'
            ],
            shortDescription: 'Airbus A320neo Series',
            description: 'The A320neo (new engine option) is one of many upgrades introduced by Airbus to help maintain ' +
                'its A320 product line’s position as the world’s most advanced and fuel-efficient single-aisle ' +
                'aircraft family. The baseline A320neo jetliner has a choice of two new-generation engines ' +
                '(the PurePower PW1100G-JM from Pratt and Whitney and the LEAP-1A from CFM International) ' +
                'and features large, fuel-saving wingtip devices known as Sharklets.',
            targetDirectory: 'flybywire-aircraft-a320-neo',
            alternativeNames: [
                'A32NX',
                'a32nx'
            ],
            tracks: [
                {
                    name: 'Stable',
                    key: 'a32nx-stable',
                    url: 'https://cdn.flybywiresim.com/addons/a32nx/stable',
                    description:
                        <>
                            <p>
                                Stable is our variant that has the least bugs and best performance. This version
                                will not
                                always be up to date but we guarantee it's compatibility with each major patch
                                from MSFS.
                            </p>
                        </>,
                    isExperimental: false,
                    fetchLatestVersionName() {
                        return DataCache.from<string>('latest_version_stable', RELEASE_CACHE_LIMIT)
                            .fetchOrCompute(async () => (await GitVersions.getReleases('flybywiresim', 'a32nx'))[0].name);
                    },
                },
                {
                    name: 'Development',
                    key: 'a32nx-dev',
                    url: 'https://cdn.flybywiresim.com/addons/a32nx/master',
                    description:
                        <>
                            <p>
                                Development will have the latest features that will end up in the next stable.
                                Bugs are to be expected. It updates whenever something is added to the 'master'
                                branch on Github.
                                Please visit our discord for support.
                            </p>
                        </>,
                    isExperimental: false,
                    fetchLatestVersionName() {
                        return DataCache.from<string>('latest_version_dev', RELEASE_CACHE_LIMIT)
                            .fetchOrCompute(async () => (await GitVersions.getNewestCommit('flybywiresim', 'a32nx', 'master')).sha.substring(0, 7));
                    }
                },
                {
                    name: 'Experimental',
                    key: 'experimental',
                    url: 'https://cdn.flybywiresim.com/addons/a32nx/cfbw-cap',
                    description:
                        <>
                            <p>
                                The experimental version is similar to the development branch, but contains custom systems (including fly-by-wire, autopilot, FADEC, etc.).
                                This version is updated whenever the 'autopilot' branch on GitHub is updated, which is around every 12 hours.
                            </p>
                        </>,
                    isExperimental: true,
                    warningContent:
                        <>
                            <p>The experimental version contains custom systems that more closely matches real-life behaviour of an A320neo. Those are in development and bugs are to be expected.</p>
                            <p>To understand what you are getting into and the potential issues you might experience, please read <a onClick={() => shell.openExternal("https://github.com/flybywiresim/a32nx/blob/autopilot/docs/README.md")}>this guide</a>.</p>

                            <p style={{ marginTop: '1em', fontWeight: 'bold' }}>Please be aware that no support will be offered via Discord help channels.</p>
                        </>,
                    fetchLatestVersionName() {
                        return DataCache.from<string>('latest_version_experimental', RELEASE_CACHE_LIMIT)
                            .fetchOrCompute(async () => (await GitVersions.getNewestCommit('flybywiresim', 'a32nx', 'autopilot')).sha.substring(0, 7));
                    },
                },
            ],
        },
        {
            name: 'A380X',
            repoName: 'a380x',
            aircraftName: 'A380',
            key: 'A380X',
            enabled: false,
            menuIconUrl: A380NoseSVG,
            backgroundImageUrls: [],
            shortDescription: 'Airbus A380-800',
            description: '',
            targetDirectory: 'A380',
            tracks: [],
        },
    ],
};
