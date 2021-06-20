package borman.aroundthehorn.services;

import borman.aroundthehorn.dao.RoomDao;
import borman.aroundthehorn.models.Room;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomDao roomDao;

    public RoomService(RoomDao roomDao) {
        this.roomDao = roomDao;
    }

    public List<Room> fetchAllRooms() {
        return roomDao.fetchAllRooms();
    }

    public void insertRoom(Room room) {
        roomDao.insertRoom(room);
    }

}