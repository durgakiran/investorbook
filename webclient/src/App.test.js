import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { SEARCH_INVESTORS } from "./Pages/Investors/InvestorTable/InvestorTable";
import { GET_INVESTMENTS } from "./Pages/Investors/Investments/Investments";
const mocks = [
  {
    request: {
      query: SEARCH_INVESTORS,
      variables: {
        searchQuery: "%%",
        skip: 0,
        pageSize: 6,
      },
    },
    result: () => {
      return {
        data: {
          investor: [
            {
              name: "Anna Jørgensen",
              id: 1,
              photo_large: "https://randomuser.me/api/portraits/women/7.jpg",
              photo_thumbnail:
                "https://randomuser.me/api/portraits/thumb/women/7.jpg",
            },
            {
              name: "Connor Stevens",
              id: 2,
              photo_large: "https://randomuser.me/api/portraits/men/13.jpg",
              photo_thumbnail:
                "https://randomuser.me/api/portraits/thumb/men/13.jpg",
            },
            {
              name: "Isabel Lopez",
              id: 3,
              photo_large: "https://randomuser.me/api/portraits/women/77.jpg",
              photo_thumbnail:
                "https://randomuser.me/api/portraits/thumb/women/77.jpg",
            },
            {
              name: "Ben Watkins",
              id: 4,
              photo_large: "https://randomuser.me/api/portraits/men/4.jpg",
              photo_thumbnail:
                "https://randomuser.me/api/portraits/thumb/men/4.jpg",
            },
            {
              name: "Sofia Petersen",
              id: 5,
              photo_large: "https://randomuser.me/api/portraits/women/92.jpg",
              photo_thumbnail:
                "https://randomuser.me/api/portraits/thumb/women/92.jpg",
            },
            {
              name: "Joshua Gaillard",
              id: 6,
              photo_large: "https://randomuser.me/api/portraits/men/63.jpg",
              photo_thumbnail:
                "https://randomuser.me/api/portraits/thumb/men/63.jpg",
            },
            {
              name: "Lonnie Black",
              id: 7,
              photo_large: "https://randomuser.me/api/portraits/men/63.jpg",
              photo_thumbnail:
                "https://randomuser.me/api/portraits/thumb/men/63.jpg",
            },
            {
              name: "Jake Palmer",
              id: 8,
              photo_large: "https://randomuser.me/api/portraits/men/45.jpg",
              photo_thumbnail:
                "https://randomuser.me/api/portraits/thumb/men/45.jpg",
            },
            {
              name: "Kelly Johnston",
              id: 9,
              photo_large: "https://randomuser.me/api/portraits/men/78.jpg",
              photo_thumbnail:
                "https://randomuser.me/api/portraits/thumb/men/78.jpg",
            },
            {
              name: "Salvador Ferguson",
              id: 10,
              photo_large: "https://randomuser.me/api/portraits/men/46.jpg",
              photo_thumbnail:
                "https://randomuser.me/api/portraits/thumb/men/46.jpg",
            },
          ],
          investor_aggregate: {
            aggregate: {
              count: 1014814,
            },
          },
        },
      };
    },
  },
  {
    request: {
        query: GET_INVESTMENTS,
        variables: {
          investorId: 1,
        }
    },
    result: () => {
      return {
        "data": {
          "investment": [
            {
              "company_id": 1224,
              "company": {
                "name": "Topiczoom"
              }
            },
            {
              "company_id": 1778,
              "company": {
                "name": "Thoughtsphere"
              }
            },
            {
              "company_id": 1893,
              "company": {
                "name": "Buzzbean"
              }
            },
            {
              "company_id": 3954,
              "company": {
                "name": "Roomm"
              }
            },
            {
              "company_id": 4349,
              "company": {
                "name": "Skynoodle"
              }
            },
            {
              "company_id": 5160,
              "company": {
                "name": "Photolist"
              }
            },
            {
              "company_id": 5384,
              "company": {
                "name": "Miboo"
              }
            },
            {
              "company_id": 5725,
              "company": {
                "name": "Jabberstorm"
              }
            },
            {
              "company_id": 6143,
              "company": {
                "name": "Midel"
              }
            },
            {
              "company_id": 6155,
              "company": {
                "name": "Realblab"
              }
            },
            {
              "company_id": 6635,
              "company": {
                "name": "Voolith"
              }
            },
            {
              "company_id": 6813,
              "company": {
                "name": "Brainsphere"
              }
            },
            {
              "company_id": 7155,
              "company": {
                "name": "Edgewire"
              }
            },
            {
              "company_id": 7268,
              "company": {
                "name": "Trunyx"
              }
            },
            {
              "company_id": 7332,
              "company": {
                "name": "Oyoyo"
              }
            },
            {
              "company_id": 8971,
              "company": {
                "name": "Katz"
              }
            },
            {
              "company_id": 9470,
              "company": {
                "name": "Shuffledrive"
              }
            },
            {
              "company_id": 66907,
              "company": {
                "name": "Zooxo"
              }
            },
            {
              "company_id": 87624,
              "company": {
                "name": "Skalith"
              }
            },
            {
              "company_id": 97429,
              "company": {
                "name": "Kamba"
              }
            },
            {
              "company_id": 143193,
              "company": {
                "name": "Ntag"
              }
            },
            {
              "company_id": 149446,
              "company": {
                "name": "Voomm"
              }
            },
            {
              "company_id": 156912,
              "company": {
                "name": "Wikizz"
              }
            },
            {
              "company_id": 179355,
              "company": {
                "name": "Latz"
              }
            },
            {
              "company_id": 317486,
              "company": {
                "name": "Quinu"
              }
            },
            {
              "company_id": 328647,
              "company": {
                "name": "Gabcube"
              }
            },
            {
              "company_id": 397500,
              "company": {
                "name": "Vidoo"
              }
            },
            {
              "company_id": 411957,
              "company": {
                "name": "Realblab"
              }
            },
            {
              "company_id": 413273,
              "company": {
                "name": "Dynabox"
              }
            },
            {
              "company_id": 458295,
              "company": {
                "name": "Midel"
              }
            },
            {
              "company_id": 477218,
              "company": {
                "name": "Centizu"
              }
            },
            {
              "company_id": 557886,
              "company": {
                "name": "Skyble"
              }
            },
            {
              "company_id": 588196,
              "company": {
                "name": "Photobean"
              }
            },
            {
              "company_id": 623757,
              "company": {
                "name": "Gigazoom"
              }
            },
            {
              "company_id": 670639,
              "company": {
                "name": "Jabbersphere"
              }
            },
            {
              "company_id": 671899,
              "company": {
                "name": "Zoomdog"
              }
            },
            {
              "company_id": 693801,
              "company": {
                "name": "Viva"
              }
            },
            {
              "company_id": 743529,
              "company": {
                "name": "Jabberbean"
              }
            },
            {
              "company_id": 749342,
              "company": {
                "name": "JumpXS"
              }
            },
            {
              "company_id": 813662,
              "company": {
                "name": "Jaxnation"
              }
            },
            {
              "company_id": 816225,
              "company": {
                "name": "Divavu"
              }
            },
            {
              "company_id": 823800,
              "company": {
                "name": "Buzzshare"
              }
            },
            {
              "company_id": 832364,
              "company": {
                "name": "Brightdog"
              }
            },
            {
              "company_id": 840021,
              "company": {
                "name": "Divape"
              }
            },
            {
              "company_id": 919954,
              "company": {
                "name": "Riffpedia"
              }
            }
          ]
        }
      } 
    }
  }
];

describe("Routing", () => {
  test("renders learn react link", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </MockedProvider>
    );
    const containerElement = screen.getByTestId(/app/i);
    expect(containerElement).toBeInTheDocument();
  });

  it("should render investors by default", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </MockedProvider>
    );
    screen.debug();
    const containerElement = screen.getAllByText(/Investors/i);
    expect(containerElement[1]).toBeInTheDocument();
  });
});
