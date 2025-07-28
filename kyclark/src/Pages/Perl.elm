module Pages.Perl exposing (page)

import Components.Header
import Html exposing (Html)
import Html.Attributes exposing (class, href)
import View exposing (View)


page : View msg
page =
    Components.Header.view
        { title = "Perl"
        , body = [ body ]
        }


body =
    Html.div [ class "content" ]
        [ Html.h1 [ class "title" ] [ Html.text "Perl" ]
        , Html.ul [ class "ul" ]
            [ Html.li []
                [ Html.a
                    [ href "https://metacpan.org/author/KCLARK" ]
                    [ Html.text "CPAN Author Page" ]
                ]
            , Html.li []
                [ Html.a [ href "https://pmc.ncbi.nlm.nih.gov/articles/PMC2773250/" ]
                    [ Html.text "CMap 1.01: a comparative mapping application for the Internet" ]
                , Html.text " "
                , Html.a [ href "https://sourceforge.net/projects/gmod/files/cmap/" ]
                    [ Html.text "(SourceForge)" ]
                ]
            , Html.li []
                [ Html.a
                    [ href "https://metacpan.org/pod/SQL::Translator" ]
                    [ Html.text "SQL::Translator" ]
                , Html.text
                    """: I started this project in the early 2000s as I was developing CMap to run on Oracle, MySQL, PostgreSQL, and SQLite and needed a way to quickly translate schema changes from one dialect to another. I managed this open-source project for many years before transferring ownership."
                    """
                ]
            ]
        ]
