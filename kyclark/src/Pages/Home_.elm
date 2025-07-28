module Pages.Home_ exposing (page)

import Components.Header
import Html
import Html.Attributes exposing (class, href)
import View exposing (View)


page : View msg
page =
    Components.Header.view
        { title = "Ken Youens-Clark"
        , body = [ body ]
        }


body =
    Html.div [ class "content" ]
        [ Html.h2 [ class "title is-1" ] [ Html.text "Ken Youens-Clark Resume" ]
        , sketch
        , skills
        , Html.hr [] []
        , jobs
        , Html.hr [] []
        , education
        ]


sketch =
    Html.p []
        [ Html.ul []
            [ Html.li []
                [ Html.text
                    "Innovative software engineer with expertise in industry, academia, and research."
                ]
            , Html.li []
                [ Html.text
                    "Highly skilled in the entire software lifecycle, including design, documentation, execution, testing, release, and iteration."
                ]
            , Html.li []
                [ Html.text
                    "Strong experience in mentoring new developers, providing instruction, and maximizing system capabilities."
                ]
            ]
        ]


skills =
    Html.div []
        [ Html.table [ class "table" ]
            [ Html.thead [] []
            , Html.tbody []
                [ Html.tr []
                    [ Html.th [] [ Html.text "Skills" ]
                    , Html.td [] [ Html.text "Bioinformatics, Data Engineering, Web development, APIs, Analysis pipelines, Testing/TDD" ]
                    ]
                , Html.tr []
                    [ Html.th [] [ Html.text "Languages/Technologies" ]
                    , Html.td [] [ Html.text "Python, Rust, Elm, Perl, bash, WDL, OpenAPI/Swagger, Docker" ]
                    ]
                , Html.tr []
                    [ Html.th [] [ Html.text "Databases" ]
                    , Html.td [] [ Html.text "PostgreSQL, MySQL, SQLite, MongoDB" ]
                    ]
                , Html.tr []
                    [ Html.th [] [ Html.text "Publications" ]
                    , Html.td [] [ link "https://orcid.org/0000-0001-9961-144X" ]
                    ]
                , Html.tr []
                    [ Html.th [] [ Html.text "GitHub" ]
                    , Html.td [] [ link "https://github.com/kyclark" ]
                    ]
                , Html.tr []
                    [ Html.th [] [ Html.text "Email" ]
                    , Html.td []
                        [ Html.a
                            [ href "mailto:kyclark@gmail.com" ]
                            [ Html.text "kyclark@gmail.com" ]
                        ]
                    ]
                ]
            ]
        ]


link url =
    Html.a [ href url ] [ Html.text url ]


education =
    Html.div []
        [ Html.h3 [ class "subtitle" ] [ Html.text "Education" ]
        , Html.ul []
            [ Html.li []
                [ Html.text "MS in Biosystems Engineering (GPA 4.0), University of Arizona, Tucson, AZ" ]
            , Html.li []
                [ Html.text "BA in English Literature, minor in music (GPA 3.9), University of North Texas, Denton, TX" ]
            ]
        ]


jobs =
    Html.div []
        [ Html.h3 [ class "subtitle" ] [ Html.text "Experience" ]
        , Html.table [ class "table" ]
            [ Html.thead [] []
            , Html.tbody []
                [ Html.tr []
                    [ Html.td []
                        [ Html.b [] [ Html.text "University of Arizona" ]
                        , Html.text ": "
                        , Html.i [] [ Html.text "Sr. Scientific Developer" ]
                        , Html.text ", Lab of Dr. Travis Wheeler, College of Pharmacy, June 2024-Present"
                        , Html.ul []
                            [ Html.li []
                                [ Html.text "Sufr ("
                                , link "https://github.com/TravisWheelerLab/sufr"
                                , Html.text "): Rust program for fast, parallel construction and searching of suffix arrays, including support for fully sorted suffixes or partially sorted via maximum query length or spaced seeds."
                                ]
                            , Html.li []
                                [ Html.text "SCULU ("
                                , link "https://github.com/TravisWheelerLab/sculu-rs"
                                , Html.text "): Rust workflow to repeatedly merge protein subfamilies to create reliably distinctive consensi sequences."
                                ]
                            , Html.li []
                                [ Html.text "Tallyman ("
                                , link "https://github.com/TravisWheelerLab/tallyman"
                                , Html.text "): Rust program for counting sequences."
                                ]
                            , Html.li []
                                [ link "https://mdrepo.org"
                                , Html.text ": Elm rewrite of React user interface, update Django backend and file processing."
                                ]
                            ]
                        ]
                    ]
                , Html.tr []
                    [ Html.td []
                        [ Html.b [] [ Html.text "DNAnexus" ]
                        , Html.text ": "
                        , Html.i [] [ Html.text "Sr. Solutions Engineer" ]
                        , Html.text ", January 2022-March 2024"
                        , Html.ul []
                            [ Html.li []
                                [ Html.text "Pre- and post-sales development of custom cloud-based workflow solutions for customers using bash, Python, and WDL/dxCompiler. Worked with dozens of clients in clinical diagnostics, Pharma, and research to create new or translate existing on-premises/HPC/DIY-AWS workflows into reliable DNAnexus pipelines."
                                ]
                            , Html.li []
                                [ Html.text "Lead new customer training and onboarding with DNAnexus Academy. Consistently given highest feedback rankings by customers."
                                ]
                            , Html.li []
                                [ Html.text "Lead the effort to improve training materials and create a public collection of tutorials at "
                                , link "http://academy.dnanexus.com"
                                , Html.text "."
                                ]
                            , Html.li []
                                [ link "https://github.com/kyclark/dxrs"
                                , Html.text ": Project to address technical debt by rewriting "
                                , Html.code [] [ Html.text "dxpy" ]
                                , Html.text "CLI ("
                                , link "https://pypi.org/project/dxpy/"
                                , Html.text ") in Rust."
                                ]
                            ]
                        ]
                    ]
                , Html.tr []
                    [ Html.td []
                        [ Html.b [] [ Html.text "University of Arizona" ]
                        , Html.text ": "
                        , Html.i [] [ Html.text "Adjunct Lecturer" ]
                        , Html.text ", Biosystems Engineering Department, Fall 2021"
                        , Html.ul []
                            [ Html.li []
                                [ Html.text "Created introductory programming material (published as Tiny Python Projects) and lead classroom instruction for undergraduate and graduate students."
                                ]
                            ]
                        ]
                    ]
                , Html.tr []
                    [ Html.td []
                        [ Html.b [] [ Html.text "The Critical Path Institute" ]
                        , Html.text ": "
                        , Html.i [] [ Html.text "Data Engineer" ]
                        , Html.text ", August 2020-December 2021"
                        , Html.ul []
                            [ Html.li []
                                [ Html.text "Data ingestion tasks for Rare Disease Clinical Outcome Assessment Consortium, including ETL operations for wearable sensor data."
                                ]
                            , Html.li []
                                [ Html.text "Designed and built mirror of clinicaltrials.gov database in PostgreSQL for C-Path scientists to track and save clinical trails of interest through a custom website/API written with Rust ("
                                , link "https://github.com/kyclark/ctloader"
                                , Html.text "), Elm/Python/FastAPI ("
                                , link "https://github.com/kyclark/ctweb"
                                , Html.text "), PostgreSQL."
                                ]
                            ]
                        ]
                    ]
                , Html.tr []
                    [ Html.td []
                        [ Html.b [] [ Html.text "University of Arizona" ]
                        , Html.text ": "
                        , Html.i [] [ Html.text "Sr. Scientific Developer" ]
                        , Html.text ", Lab of Dr. Bonnie Hurwitz, Biosystems Engineering Department, June 2014-July 2020"
                        , Html.ul []
                            [ Html.li []
                                [ Html.text "Created iMicrobe.us ("
                                , link "https://doi.org/10.1093/gigascience/giz083"
                                , Html.text ") for research of environmental/metagenomic datasets using Elm, NodeJS, MySQL."
                                ]
                            , Html.li []
                                [ Html.text "Tool development and data analysis for research projects, papers, and collaborations." ]
                            , Html.li []
                                [ Html.text "Developed HPC pipelines in bash, Rust, Python, and R executed locally by SLURM or remotely at Texas Advanced Computing Center via Cyverse API (cyverse.org)" ]
                            , Html.li []
                                [ Html.text "Mentoring of students and junior developers, lab presentations"
                                ]
                            ]
                        ]
                    ]
                , Html.tr []
                    [ Html.td []
                        [ Html.b [] [ Html.text "Cold Spring Harbor Laboratory" ]
                        , Html.text ": "
                        , Html.i [] [ Html.text "Bioinformatics Manager II" ]
                        , Html.text ", Lab of Drs. Lincoln Stein and Doreen Ware, May 2001-May 2014"
                        , Html.ul []
                            [ Html.li []
                                [ link "http://gramene.org " ]
                            ]
                        ]
                    ]
                , Html.tr []
                    [ Html.td []
                        [ Html.b [] [ Html.text "Prior experience at Boston.com/New York Times Digital" ]
                        ]
                    ]
                ]
            ]
        ]
