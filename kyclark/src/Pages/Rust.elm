module Pages.Rust exposing (page)

import Components.Header
import Html exposing (Html)
import Html.Attributes exposing (class, href)
import View exposing (View)


page : View msg
page =
    Components.Header.view
        { title = "Rust"
        , body = [ body ]
        }


body =
    Html.div [ class "content" ]
        [ Html.h1 [ class "title" ] [ Html.text "Rust" ]
        , Html.ul [ class "ul" ]
            [ Html.li []
                [ Html.a
                    [ href "https://crates.io/users/kyclark" ]
                    [ Html.text "Crates.io Author Page" ]
                ]
            , Html.li []
                [ Html.a
                    [ href "https://github.com/TravisWheelerLab/sufr" ]
                    [ Html.text "Sufr" ]
                , Html.text
                    """
                    : Rust program for fast, parallel construction and searching of
                    suffix arrays, including support for fully sorted suffixes
                    or partially sorted via maximum query length or spaced seeds.
                    """
                ]
            , Html.li []
                [ Html.a [ href "https://github.com/kyclark/command-line-rust" ]
                    [ Html.text "Command-Line Rust" ]
                , Html.text
                    ": Rust rewrites of common BSD/GNU Unix command-line utilities"
                ]
            , Html.li []
                [ Html.a
                    [ href "https://github.com/TravisWheelerLab/sculu-rs" ]
                    [ Html.text "SCULU" ]
                , Html.text
                    """
                    : Rust workflow to repeatedly merge protein
                    subfamilies to create reliably distinctive consensi sequences.
                    """
                ]
            , Html.li []
                [ Html.a [ href "https://github.com/kyclark/dxrs" ]
                    [ Html.text "dxrs" ]
                , Html.text ": Rust rewrite of "
                , Html.a [ href "https://pypi.org/project/dxpy/" ]
                    [ Html.text "dxpy" ]
                ]
            , Html.li []
                [ Html.a [ href "https://github.com/kyclark/ctloader" ]
                    [ Html.text "Clinical Trials loader" ]
                , Html.text
                    """: A Rust program to parse the XML from
                    ClinicalTrials.gov and load into a PostgreSQL database"""
                ]
            ]
        ]
