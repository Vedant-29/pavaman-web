import React from 'react';

export default function Test() {
  return (
    <section className="bg-gray-100 py-5">
      <div className="container mx-auto py-5">
        <div className="mb-4">
          <nav className="bg-white rounded-3 p-3 shadow">
            <ol className="list-reset flex">
              <li><a href="#" className="text-blue-600 hover:text-blue-700">Home</a></li>
              <li><span className="mx-2 text-gray-500">/</span></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-700">User</a></li>
              <li><span className="mx-2 text-gray-500">/</span></li>
              <li className="text-gray-500">User Profile</li>
            </ol>
          </nav>
        </div>

        <div className="flex flex-wrap mx-4">
          <div className="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
            <div className="bg-white rounded shadow p-6 text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="rounded-full mx-auto mb-4"
                style={{ width: '150px' }}
              />
              <h5 className="text-xl font-semibold mb-1">John Smith</h5>
              <p className="text-gray-600 mb-2">Full Stack Developer</p>
              <p className="text-gray-600 mb-4">Bay Area, San Francisco, CA</p>
              <div className="flex justify-center mb-2">
                <button className="bg-blue-500 text-white py-2 px-4 rounded">Follow</button>
                <button className="bg-transparent border border-blue-500 text-blue-500 py-2 px-4 rounded ml-2">Message</button>
              </div>
            </div>

            <div className="bg-white rounded shadow p-6 mt-4">
              <ul className="divide-y divide-gray-200">
                <li className="flex justify-between items-center py-3">
                  <span className="text-yellow-500"><i className="fas fa-globe fa-lg"></i></span>
                  <span className="text-gray-600">https://mdbootstrap.com</span>
                </li>
                <li className="flex justify-between items-center py-3">
                  <span className="text-gray-800"><i className="fab fa-github fa-lg"></i></span>
                  <span className="text-gray-600">mdbootstrap</span>
                </li>
                <li className="flex justify-between items-center py-3">
                  <span className="text-blue-400"><i className="fab fa-twitter fa-lg"></i></span>
                  <span className="text-gray-600">@mdbootstrap</span>
                </li>
                <li className="flex justify-between items-center py-3">
                  <span className="text-pink-600"><i className="fab fa-instagram fa-lg"></i></span>
                  <span className="text-gray-600">mdbootstrap</span>
                </li>
                <li className="flex justify-between items-center py-3">
                  <span className="text-blue-700"><i className="fab fa-facebook fa-lg"></i></span>
                  <span className="text-gray-600">mdbootstrap</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-2/3 px-4">
            <div className="bg-white rounded shadow p-6 mb-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 font-semibold">Full Name</div>
                <div className="col-span-2 text-gray-600">Johnatan Smith</div>
                <hr className="col-span-3 my-2" />
                <div className="col-span-1 font-semibold">Email</div>
                <div className="col-span-2 text-gray-600">example@example.com</div>
                <hr className="col-span-3 my-2" />
                <div className="col-span-1 font-semibold">Phone</div>
                <div className="col-span-2 text-gray-600">(097) 234-5678</div>
                <hr className="col-span-3 my-2" />
                <div className="col-span-1 font-semibold">Mobile</div>
                <div className="col-span-2 text-gray-600">(098) 765-4321</div>
                <hr className="col-span-3 my-2" />
                <div className="col-span-1 font-semibold">Address</div>
                <div className="col-span-2 text-gray-600">Bay Area, San Francisco, CA</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded shadow p-6">
                <h5 className="font-semibold text-primary mb-4"><span className="font-italic">assignment</span> Project Status</h5>
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-1">Web Design</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Website Markup</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">One Page</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Mobile Template</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Backend API</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '66%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded shadow p-6">
                <h5 className="font-semibold text-primary mb-4"><span className="font-italic">assignment</span> Project Status</h5>
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-1">Web Design</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Website Markup</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">One Page</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Mobile Template</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Backend API</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '66%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
